import { ProjectivePoint } from "./secp256k1";
import { ethers } from "ethers";
import { MethodContext, BaseMethod } from "lisk-sdk";
import { OpenSwapEvent, CloseSwapEvent, RedeemSwapEvent } from "./events/swapEvents";

import { SwapStore } from "./stores/swap";
import { FeeMethod, TokenMethod, Swap, ModuleConfig } from "./types";
import { UINT256_LENGTH, ATMEN_MODULE_NAME } from "./constants";

export class InternalMethod extends BaseMethod {
    private _tokenMethod!: TokenMethod;
    private _feeMethod!: FeeMethod;
    private _config!: ModuleConfig;

    public init(config: ModuleConfig): void {
        this._config = config;
    }

    public addDependencies(tokenMethod: TokenMethod, feeMethod: FeeMethod) {
        this._tokenMethod = tokenMethod;
        this._feeMethod = feeMethod;
    }
    public commitmentFromPoint(qx: Buffer, qy: Buffer): Buffer {
        const commitment = Buffer.from(
            (BigInt(ethers.solidityPackedKeccak256(["bytes", "bytes"], [qx, qy])) & BigInt("0x00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")).toString(16),
            "hex"
        );

        return commitment;
    }

    public commitmentFromSecret(secretKey: Buffer): Buffer {
        const point = ProjectivePoint.BASE.mul(BigInt("0x" + secretKey.toString("hex")));
        const qx = Buffer.from(point.x.toString(16), "hex");
        const qy = Buffer.from(point.y.toString(16), "hex");
        return this.commitmentFromPoint(qx, qy);
    }

    public commitmentFromSharedSecret(qx: Buffer, qy: Buffer, sharedSecret: Buffer): Buffer {
        const point1 = new ProjectivePoint(BigInt(qx.toString("hex")), BigInt(qy.toString("hex")), BigInt(1));
        const point2 = ProjectivePoint.BASE.mul(BigInt("0x" + sharedSecret.toString("hex")));
        const res = point1.add(point2);
        const qx3 = Buffer.from(res.x.toString(16), "hex");
        const qy3 = Buffer.from(res.y.toString(16), "hex");
        return this.commitmentFromPoint(qx3, qy3);
    }

    public async _openSwap(methodContext: MethodContext, swapID: Buffer, swap: Swap): Promise<void> {
        this._feeMethod.payFee(methodContext, this._config.swapInitializationFee);
        this._tokenMethod.lock(methodContext, swap.senderAddress, ATMEN_MODULE_NAME, swap.tokenID, swap.value);
        await this.stores.get(SwapStore).set(methodContext, swapID, swap);
        const swapEvent = {
            ...swap,
            swapID: swapID,
            secretKey: Buffer.alloc(UINT256_LENGTH),
        };

        this.events.get(OpenSwapEvent).log(methodContext, swapEvent);
    }

    public async _closeSwap(methodContext: MethodContext, swapID: Buffer, secretKey: Buffer): Promise<void> {
        const swapStore = this.stores.get(SwapStore);
        const swap = await swapStore.get(methodContext, swapID);

        this._tokenMethod.unlock(methodContext, swap.senderAddress, ATMEN_MODULE_NAME, swap.tokenID, swap.value);

        this._tokenMethod.transfer(methodContext, swap.senderAddress, swap.recipientAddress, swap.tokenID, swap.value);

        await swapStore.del(methodContext, swapID);

        const swapEvent = {
            ...swap,
            swapID: swapID,
            secretKey: secretKey,
        };
        this.events.get(CloseSwapEvent).log(methodContext, swapEvent);
    }

    public async _redeemSwap(methodContext: MethodContext, swapID: Buffer): Promise<void> {
        const swapStore = this.stores.get(SwapStore);
        const swap = await swapStore.get(methodContext, swapID);

        this._tokenMethod.unlock(methodContext, swap.senderAddress, ATMEN_MODULE_NAME, swap.tokenID, swap.value);

        await swapStore.del(methodContext, swapID);

        const swapEvent = {
            ...swap,
            swapID: swapID,
            secretKey: Buffer.alloc(UINT256_LENGTH),
        };
        this.events.get(RedeemSwapEvent).log(methodContext, swapEvent);
    }
}
