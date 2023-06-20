"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalMethod = void 0;
const secp256k1_1 = require("./secp256k1");
const ethers_1 = require("ethers");
const lisk_sdk_1 = require("lisk-sdk");
const swapEvents_1 = require("./events/swapEvents");
const swap_1 = require("./stores/swap");
const constants_1 = require("./constants");
class InternalMethod extends lisk_sdk_1.BaseMethod {
    init(config) {
        this._config = config;
    }
    addDependencies(tokenMethod, feeMethod) {
        this._tokenMethod = tokenMethod;
        this._feeMethod = feeMethod;
    }
    commitmentToAddress(xCoordinate, yCoordinate) {
        const address = Buffer.from((BigInt(ethers_1.ethers.solidityPackedKeccak256(['bytes', 'bytes'], [xCoordinate, yCoordinate])) &
            BigInt('0x00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')).toString(16), 'hex').subarray(0, constants_1.ADDRESS_LENGTH);
        return address;
    }
    commitmentFromSecret(secretKey) {
        const point = secp256k1_1.ProjectivePoint.BASE.mul(BigInt('0x' + secretKey.toString('hex')));
        const commX = Buffer.from(point.x.toString(16), 'hex');
        const commY = Buffer.from(point.y.toString(16), 'hex');
        return [commX, commY];
    }
    async _openSwap(methodContext, swapID, swap) {
        this._feeMethod.payFee(methodContext, this._config.swapInitializationFee);
        this._tokenMethod.lock(methodContext, swap.senderAddress, constants_1.CLOAK_MODULE_NAME, swap.tokenID, swap.value);
        await this.stores.get(swap_1.SwapStore).set(methodContext, swapID, swap);
        const swapEvent = {
            ...swap,
            swapID: swapID,
            secretKey: Buffer.alloc(constants_1.UINT256_LENGTH),
        };
        this.events.get(swapEvents_1.OpenSwapEvent).log(methodContext, swapEvent);
    }
    async _closeSwap(methodContext, swapID, secretKey) {
        const swapStore = this.stores.get(swap_1.SwapStore);
        const swap = await swapStore.get(methodContext, swapID);
        this._tokenMethod.unlock(methodContext, swap.senderAddress, constants_1.CLOAK_MODULE_NAME, swap.tokenID, swap.value);
        this._tokenMethod.transfer(methodContext, swap.senderAddress, swap.recipientAddress, swap.tokenID, swap.value);
        await swapStore.del(methodContext, swapID);
        const swapEvent = {
            ...swap,
            swapID: swapID,
            secretKey: secretKey,
        };
        this.events.get(swapEvents_1.CloseSwapEvent).log(methodContext, swapEvent);
    }
    async _redeemSwap(methodContext, swapID) {
        const swapStore = this.stores.get(swap_1.SwapStore);
        const swap = await swapStore.get(methodContext, swapID);
        this._tokenMethod.unlock(methodContext, swap.senderAddress, constants_1.CLOAK_MODULE_NAME, swap.tokenID, swap.value);
        await swapStore.del(methodContext, swapID);
        const swapEvent = {
            ...swap,
            swapID: swapID,
            secretKey: Buffer.alloc(constants_1.UINT256_LENGTH),
        };
        this.events.get(swapEvents_1.RedeemSwapEvent).log(methodContext, swapEvent);
    }
}
exports.InternalMethod = InternalMethod;
//# sourceMappingURL=internal_method.js.map