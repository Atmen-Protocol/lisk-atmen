"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloakEndpoint = void 0;
const lisk_sdk_1 = require("lisk-sdk");
const swap_1 = require("./stores/swap");
class CloakEndpoint extends lisk_sdk_1.BaseEndpoint {
    init(moduleConfig) {
        this._moduleConfig = moduleConfig;
    }
    async getSwap(_ctx) {
        const swapStore = this.stores.get(swap_1.SwapStore);
        const swap = await swapStore.get(_ctx, _ctx.params.swapID);
        return {
            timelock: swap.timelock,
            tokenID: swap.tokenID.toString('hex'),
            value: swap.value.toString(),
            senderAddress: swap.senderAddress.toString('hex'),
            recipientAddress: swap.recipientAddress.toString('hex'),
        };
    }
    getInitializationFees() {
        return {
            swap: this._moduleConfig.swapInitializationFee.toString(),
        };
    }
}
exports.CloakEndpoint = CloakEndpoint;
//# sourceMappingURL=endpoint.js.map