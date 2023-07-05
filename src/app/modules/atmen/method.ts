import { BaseMethod, ImmutableMethodContext, JSONObject } from "lisk-sdk";
import { SwapStore } from "./stores/swap";
import { Swap } from "./types";
export class AtmenMethod extends BaseMethod {
    // eslint-disable-next-line @typescript-eslint/require-await
    public async getSwap(_ctx: ImmutableMethodContext, swapID: Buffer): Promise<JSONObject<Swap>> {
        const swapStore = this.stores.get(SwapStore);

        const swap = await swapStore.get(_ctx, swapID);
        return {
            timelock: swap.timelock,
            tokenID: swap.tokenID.toString("hex"),
            value: swap.value.toString(),
            senderAddress: swap.senderAddress.toString("hex"),
            recipientAddress: swap.recipientAddress.toString("hex"),
        };
    }
}
