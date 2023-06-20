"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeemSwapEvent = exports.CloseSwapEvent = exports.OpenSwapEvent = void 0;
const lisk_sdk_1 = require("lisk-sdk");
const schemas_1 = require("../schemas");
class OpenSwapEvent extends lisk_sdk_1.BaseEvent {
    constructor() {
        super(...arguments);
        this.schema = schemas_1.swapEventSchema;
    }
    log(ctx, data) {
        this.add(ctx, data, [data.swapID, data.senderAddress, data.recipientAddress]);
    }
}
exports.OpenSwapEvent = OpenSwapEvent;
class CloseSwapEvent extends lisk_sdk_1.BaseEvent {
    constructor() {
        super(...arguments);
        this.schema = schemas_1.swapEventSchema;
    }
    log(ctx, data) {
        this.add(ctx, data, [data.swapID, data.senderAddress, data.recipientAddress]);
    }
}
exports.CloseSwapEvent = CloseSwapEvent;
class RedeemSwapEvent extends lisk_sdk_1.BaseEvent {
    constructor() {
        super(...arguments);
        this.schema = schemas_1.swapEventSchema;
    }
    log(ctx, data) {
        this.add(ctx, data, [data.swapID, data.senderAddress, data.recipientAddress]);
    }
}
exports.RedeemSwapEvent = RedeemSwapEvent;
//# sourceMappingURL=swapEvents.js.map