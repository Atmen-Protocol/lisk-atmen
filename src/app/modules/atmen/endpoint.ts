import { BaseEndpoint, ModuleEndpointContext, JSONObject } from "lisk-sdk";
import { SwapStore } from "./stores/swap";
import { Swap, ModuleConfig } from "./types";
import { InternalMethod } from "./internal_method";

export class AtmenEndpoint extends BaseEndpoint {
    private _moduleConfig!: ModuleConfig;
    private _internalMethod!: InternalMethod;

    public init(moduleConfig: ModuleConfig) {
        this._moduleConfig = moduleConfig;
    }

    public addDependencies(internalMethod: InternalMethod) {
        this._internalMethod = internalMethod;
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    public async getSwap(_ctx: ModuleEndpointContext): Promise<JSONObject<Swap>> {
        const swapStore = this.stores.get(SwapStore);

        const swap = await swapStore.get(_ctx, _ctx.params.swapID as Buffer);
        return {
            timelock: swap.timelock,
            tokenID: swap.tokenID.toString("hex"),
            value: swap.value.toString(),
            senderAddress: swap.senderAddress.toString("hex"),
            recipientAddress: swap.recipientAddress.toString("hex"),
            tip: swap.tip.toString(),
        };
    }

    public async commitmentFromSharedSecret(_ctx: ModuleEndpointContext): Promise<Buffer> {
        return this._internalMethod.commitmentFromSharedSecret(_ctx.params.qx as bigint, _ctx.params.qy as bigint, _ctx.params.sharedSecret as Buffer);
    }

    public async commitmentFromSecret(_ctx: ModuleEndpointContext): Promise<Buffer> {
        return this._internalMethod.commitmentFromSecret(_ctx.params.secret as Buffer);
    }

    public async commitmentFromPoint(_ctx: ModuleEndpointContext): Promise<Buffer> {
        return this._internalMethod.commitmentFromPoint(_ctx.params.qx as bigint, _ctx.params.qy as bigint);
    }

    public getInitializationFees() {
        return {
            swap: this._moduleConfig.swapInitializationFee.toString(),
        };
    }
}
