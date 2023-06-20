"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = exports.G_Y_PARITY = exports.G = exports.SWAP_INITIALIZATION_FEE = exports.UINT256_LENGTH = exports.SWAP_ID_LENGTH = exports.ADDRESS_LENGTH = exports.TOKEN_ID_LENGTH = exports.CLOAK_MODULE_NAME = void 0;
exports.CLOAK_MODULE_NAME = 'cloak';
exports.TOKEN_ID_LENGTH = 8;
exports.ADDRESS_LENGTH = 20;
exports.SWAP_ID_LENGTH = 20;
exports.UINT256_LENGTH = 32;
exports.SWAP_INITIALIZATION_FEE = BigInt(500000);
exports.G = (Buffer.from('0xa6ecb3f599964fe04c72e486a8f90172493c21f4185f1ab9a7fe05659480c548', 'hex'),
    Buffer.from('0xdf67fd3f4255826c234a5262adc70e14a6d42f13ee55b65e885e666e1dd5d3f5', 'hex'));
exports.G_Y_PARITY = 28;
exports.defaultConfig = {
    swapInitializationFee: exports.SWAP_INITIALIZATION_FEE.toString(),
};
//# sourceMappingURL=constants.js.map