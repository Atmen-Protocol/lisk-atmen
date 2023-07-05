import { BaseEndpoint, ModuleEndpointContext, JSONObject } from "lisk-sdk";
import { SwapStore } from "./stores/swap";
import { Swap, ModuleConfig } from "./types";

export class AtmenEndpoint extends BaseEndpoint {
    private _moduleConfig!: ModuleConfig;

    public init(moduleConfig: ModuleConfig) {
        this._moduleConfig = moduleConfig;
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
        };
    }

    public getInitializationFees() {
        return {
            swap: this._moduleConfig.swapInitializationFee.toString(),
        };
    }
}
