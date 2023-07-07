import { BaseMethod, ImmutableMethodContext, JSONObject } from "lisk-sdk";
import { SwapStore } from "./stores/swap";
import { Swap } from "./types";
import { InternalMethod } from "./internal_method";
export class AtmenMethod extends BaseMethod {
    private _internalMethod!: InternalMethod;

    public addDependencies(internalMethod: InternalMethod) {
        this._internalMethod = internalMethod;
    }
    public async getSwap(_ctx: ImmutableMethodContext, swapID: Buffer): Promise<JSONObject<Swap>> {
        const swapStore = this.stores.get(SwapStore);
        const swap = await swapStore.get(_ctx, swapID);
        return {
            timelock: swap.timelock,
            tokenID: swap.tokenID.toString("hex"),
            value: swap.value.toString(),
            senderAddress: swap.senderAddress.toString("hex"),
            recipientAddress: swap.recipientAddress.toString("hex"),
            tip: swap.tip.toString(),
        };
    }

    public commitmentFromSharedSecret(_ctx: ImmutableMethodContext, qx: bigint, qy: bigint, sharedSecret: Buffer): Buffer {
        return this._internalMethod.commitmentFromSharedSecret(qx, qy, sharedSecret);
    }

    public commitmentFromSecret(_ctx: ImmutableMethodContext, secret: Buffer): Buffer {
        return this._internalMethod.commitmentFromSecret(secret);
    }

    public commitmentFromPoint(_ctx: ImmutableMethodContext, qx: bigint, qy: bigint): Buffer {
        return this._internalMethod.commitmentFromPoint(qx, qy);
    }
}
