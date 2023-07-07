import { BaseEvent, EventQueuer } from "lisk-sdk";
import { SwapEvent } from "../types";
import { swapEventSchema } from "../schemas";

export class OpenSwapEvent extends BaseEvent<SwapEvent> {
    public schema = swapEventSchema;

    public log(ctx: EventQueuer, data: SwapEvent): void {
        this.add(ctx, data, [data.swapID, data.senderAddress, data.recipientAddress]);
    }
}

export class CloseSwapEvent extends BaseEvent<SwapEvent> {
    public schema = swapEventSchema;

    public log(ctx: EventQueuer, data: SwapEvent): void {
        this.add(ctx, data, [data.swapID, data.senderAddress, data.recipientAddress]);
    }
}

export class RedeemSwapEvent extends BaseEvent<SwapEvent> {
    public schema = swapEventSchema;

    public log(ctx: EventQueuer, data: SwapEvent): void {
        this.add(ctx, data, [data.swapID, data.senderAddress, data.recipientAddress]);
    }
}
