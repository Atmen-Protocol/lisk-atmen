"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSwapCommand = void 0;
const lisk_validator_1 = require("@liskhq/lisk-validator");
const lisk_sdk_1 = require("lisk-sdk");
const schemas_1 = require("../schemas");
const swap_1 = require("../stores/swap");
class OpenSwapCommand extends lisk_sdk_1.BaseCommand {
    constructor() {
        super(...arguments);
        this.schema = schemas_1.openSwapParamsSchema;
    }
    init(args) {
        this._internalMethod = args.internalMethod;
    }
    async verify(context) {
        const { params, logger } = context;
        lisk_validator_1.validator.validate(schemas_1.openSwapParamsSchema, params);
        logger.info(`\nOpen Swap: swapID: ${params.swapID.toString('hex')}`);
        const swapStore = this.stores.get(swap_1.SwapStore);
        const swapExists = await swapStore.has(context, params.swapID);
        if (swapExists) {
            throw new Error(`Swap with ID ${params.swapID.toString('hex')} already exists.`);
        }
        if (params.timelock <= context.header.timestamp) {
            logger.info(`\n\nparams.timelock: ${params.timelock}`);
            logger.info(`\n\ncontext.header.timestamp: ${context.header.timestamp}`);
            throw new Error('Timelock value must be in the future.');
        }
        return {
            status: lisk_sdk_1.VerifyStatus.OK,
        };
    }
    async execute(context) {
        const { params } = context;
        const swap = {
            timelock: params.timelock,
            tokenID: params.tokenID,
            value: params.value,
            senderAddress: context.transaction.senderAddress,
            recipientAddress: params.recipientAddress,
        };
        await this._internalMethod._openSwap(context.getMethodContext(), params.swapID, swap);
    }
}
exports.OpenSwapCommand = OpenSwapCommand;
//# sourceMappingURL=openSwap.js.map