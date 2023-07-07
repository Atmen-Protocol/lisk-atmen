import { ProjectivePoint } from "./secp256k1";
import { ethers } from "ethers";
import { MethodContext, FeeMethod, TokenMethod, BaseMethod } from "lisk-sdk";
import { OpenSwapEvent, CloseSwapEvent, RedeemSwapEvent } from "./events/swapEvents";

import { SwapStore } from "./stores/swap";
import { Swap, ModuleConfig } from "./types";
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
    public commitmentFromPoint(qx: bigint, qy: bigint): Buffer {
        // const commitment = Buffer.alloc(32);
        const h = BigInt(ethers.solidityPackedKeccak256(["uint256", "uint256"], [qx, qy])) & BigInt("0x00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
        return Buffer.from(h.toString(16).padStart(64, "0"), "hex");
    }

    public commitmentFromSecret(secret: Buffer): Buffer {
        const point = ProjectivePoint.BASE.mul(BigInt("0x" + secret.toString("hex")));
        return this.commitmentFromPoint(point.x, point.y);
    }

    public commitmentFromSharedSecret(qx: bigint, qy: bigint, sharedSecret: Buffer): Buffer {
        const point1 = new ProjectivePoint(qx, qy, BigInt(1));
        const point2 = ProjectivePoint.BASE.mul(BigInt("0x" + sharedSecret.toString("hex")));
        const res = point1.add(point2);
        return this.commitmentFromPoint(res.x, res.y);
    }

    public async _openSwap(methodContext: MethodContext, swapID: Buffer, swap: Swap): Promise<void> {
        this._feeMethod.payFee(methodContext, this._config.swapInitializationFee);
        await this._tokenMethod.lock(methodContext, swap.senderAddress, ATMEN_MODULE_NAME, swap.tokenID, swap.value);
        await this.stores.get(SwapStore).set(methodContext, swapID, swap);
        const swapEvent = {
            ...swap,
            swapID: swapID,
            secret: Buffer.alloc(UINT256_LENGTH),
        };

        this.events.get(OpenSwapEvent).log(methodContext, swapEvent);
    }

    public async _closeSwap(methodContext: MethodContext, trsSenderAddress: Buffer, swapID: Buffer, secret: Buffer): Promise<void> {
        const swapStore = this.stores.get(SwapStore);
        const swap = await swapStore.get(methodContext, swapID);

        await this._tokenMethod.unlock(methodContext, swap.senderAddress, ATMEN_MODULE_NAME, swap.tokenID, swap.value);

        if (trsSenderAddress.equals(swap.recipientAddress)) {
            await this._tokenMethod.transfer(methodContext, swap.senderAddress, swap.recipientAddress, swap.tokenID, swap.value);
        } else {
            await this._tokenMethod.transfer(methodContext, swap.senderAddress, trsSenderAddress, swap.tokenID, swap.tip);
            await this._tokenMethod.transfer(methodContext, swap.senderAddress, swap.recipientAddress, swap.tokenID, swap.value - swap.tip);
        }

        const swapEvent = {
            ...swap,
            swapID: swapID,
            secret: secret,
        };
        this.events.get(CloseSwapEvent).log(methodContext, swapEvent);
        await swapStore.del(methodContext, swapID);
    }

    public async _redeemSwap(methodContext: MethodContext, swapID: Buffer): Promise<void> {
        const swapStore = this.stores.get(SwapStore);
        const swap = await swapStore.get(methodContext, swapID);

        await this._tokenMethod.unlock(methodContext, swap.senderAddress, ATMEN_MODULE_NAME, swap.tokenID, swap.value);

        const swapEvent = {
            ...swap,
            swapID: swapID,
            secret: Buffer.alloc(UINT256_LENGTH),
        };
        this.events.get(RedeemSwapEvent).log(methodContext, swapEvent);
        await swapStore.del(methodContext, swapID);
    }
}
