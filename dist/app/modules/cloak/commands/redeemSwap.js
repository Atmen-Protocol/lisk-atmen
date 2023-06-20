"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedeemSwapCommand = void 0;
const lisk_validator_1 = require("@liskhq/lisk-validator");
const lisk_sdk_1 = require("lisk-sdk");
const schemas_1 = require("../schemas");
const swap_1 = require("../stores/swap");
class RedeemSwapCommand extends lisk_sdk_1.BaseCommand {
    constructor() {
        super(...arguments);
        this.schema = schemas_1.redeemSwapParamsSchema;
    }
    init(args) {
        this._internalMethod = args.internalMethod;
    }
    async verify(context) {
        const { params } = context;
        lisk_validator_1.validator.validate(schemas_1.redeemSwapParamsSchema, params);
        const swapStore = this.stores.get(swap_1.SwapStore);
        const swapExists = await swapStore.has(context, params.swapID);
        if (!swapExists) {
            throw new Error(`Swap with ID ${params.swapID} does not exist.`);
        }
        const swap = await swapStore.get(context, params.swapID);
        if (swap.timelock > context.header.timestamp) {
            throw new Error('Swap is not expired: timelock value must be in the past.');
        }
        return {
            status: lisk_sdk_1.VerifyStatus.OK,
        };
    }
    async execute(context) {
        const { params } = context;
        this._internalMethod._redeemSwap(context.getMethodContext(), params.swapID);
    }
}
exports.RedeemSwapCommand = RedeemSwapCommand;
//# sourceMappingURL=redeemSwap.js.map