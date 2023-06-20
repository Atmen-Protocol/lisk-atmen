"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapStore = void 0;
const lisk_db_1 = require("@liskhq/lisk-db");
const lisk_sdk_1 = require("lisk-sdk");
const schemas_1 = require("../schemas");
class SwapStore extends lisk_sdk_1.BaseStore {
    constructor() {
        super(...arguments);
        this.schema = schemas_1.swapSchema;
    }
    async getOrDefault(context, swapID) {
        try {
            const swap = await this.get(context, swapID);
            return swap;
        }
        catch (error) {
            if (!(error instanceof lisk_db_1.NotFoundError)) {
                throw error;
            }
            return {
                tokenID: Buffer.alloc(0),
                value: BigInt(0),
                sender: Buffer.alloc(0),
                recipient: Buffer.alloc(0),
                timelock: BigInt(0),
            };
        }
    }
}
exports.SwapStore = SwapStore;
//# sourceMappingURL=swap.js.map