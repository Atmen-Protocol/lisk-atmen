"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSchema = exports.getInitializationFeesResponseSchema = exports.getSwapRequestSchema = exports.swapEventSchema = exports.redeemSwapParamsSchema = exports.closeSwapParamsSchema = exports.openSwapParamsSchema = exports.swapSchema = void 0;
const constants_1 = require("./constants");
exports.swapSchema = {
    $id: '/cloak/swap',
    type: 'object',
    properties: {
        tokenID: {
            dataType: 'bytes',
            fieldNumber: 1,
            minLength: constants_1.TOKEN_ID_LENGTH,
            maxLength: constants_1.TOKEN_ID_LENGTH,
        },
        value: {
            dataType: 'uint64',
            minimum: 1,
            fieldNumber: 2,
        },
        senderAddress: {
            dataType: 'bytes',
            fieldNumber: 3,
            minLength: constants_1.ADDRESS_LENGTH,
            maxLength: constants_1.ADDRESS_LENGTH,
        },
        recipientAddress: {
            dataType: 'bytes',
            fieldNumber: 4,
            minLength: constants_1.ADDRESS_LENGTH,
            maxLength: constants_1.ADDRESS_LENGTH,
        },
        timelock: {
            dataType: 'uint32',
            fieldNumber: 5,
        },
    },
    required: ['tokenID', 'value', 'senderAddress', 'recipientAddress', 'timelock'],
};
exports.openSwapParamsSchema = {
    $id: '/cloak/openSwapParams',
    type: 'object',
    required: ['swapID', 'tokenID', 'value', 'recipientAddress', 'timelock'],
    properties: {
        swapID: {
            dataType: 'bytes',
            minLength: constants_1.UINT256_LENGTH,
            maxLength: constants_1.UINT256_LENGTH,
            fieldNumber: 1,
        },
        tokenID: {
            dataType: 'bytes',
            fieldNumber: 2,
            minLength: constants_1.TOKEN_ID_LENGTH,
            maxLength: constants_1.TOKEN_ID_LENGTH,
        },
        value: {
            dataType: 'uint64',
            minimum: 1,
            fieldNumber: 3,
        },
        recipientAddress: {
            dataType: 'bytes',
            fieldNumber: 4,
            minLength: constants_1.ADDRESS_LENGTH,
            maxLength: constants_1.ADDRESS_LENGTH,
        },
        timelock: {
            dataType: 'uint32',
            minimum: 1,
            fieldNumber: 5,
        },
    },
};
exports.closeSwapParamsSchema = {
    $id: '/cloak/closeSwapParams',
    type: 'object',
    required: ['swapID', 'secretKey'],
    properties: {
        swapID: {
            dataType: 'bytes',
            minLength: constants_1.SWAP_ID_LENGTH,
            maxLength: constants_1.SWAP_ID_LENGTH,
            fieldNumber: 1,
        },
        secretKey: {
            dataType: 'bytes',
            minLength: constants_1.UINT256_LENGTH,
            maxLength: constants_1.UINT256_LENGTH,
            fieldNumber: 2,
        },
    },
};
exports.redeemSwapParamsSchema = {
    $id: '/cloak/redeemSwapParams',
    type: 'object',
    required: ['swapID'],
    properties: {
        swapID: {
            dataType: 'bytes',
            minLength: constants_1.SWAP_ID_LENGTH,
            maxLength: constants_1.SWAP_ID_LENGTH,
            fieldNumber: 1,
        },
    },
};
exports.swapEventSchema = {
    $id: '/cloak/swapEvent',
    type: 'object',
    properties: {
        ...exports.swapSchema.properties,
        swapID: {
            dataType: 'bytes',
            fieldNumber: 6,
            minLength: constants_1.SWAP_ID_LENGTH,
            maxLength: constants_1.SWAP_ID_LENGTH,
        },
        secretKey: {
            dataType: 'bytes',
            fieldNumber: 7,
            minLength: constants_1.UINT256_LENGTH,
            maxLength: constants_1.UINT256_LENGTH,
        },
    },
    required: [...exports.swapSchema.required, 'swapID', 'secretKey'],
};
exports.getSwapRequestSchema = {
    $id: '/cloak/endpoint/getSwapRequest',
    type: 'object',
    required: ['swapID'],
    properties: {
        swapID: {
            type: 'string',
            format: 'hex',
            minLength: constants_1.SWAP_ID_LENGTH * 2,
            maxLength: constants_1.SWAP_ID_LENGTH * 2,
        },
    },
};
exports.getInitializationFeesResponseSchema = {
    $id: '/cloak/endpoint/getInitializationFees',
    type: 'object',
    properties: {
        swap: {
            type: 'string',
            format: 'uint64',
        },
    },
    required: ['swap'],
};
exports.configSchema = {
    $id: '/cloak/config',
    type: 'object',
    properties: {
        swapInitializationFee: {
            type: 'string',
            format: 'uint64',
        },
    },
};
//# sourceMappingURL=schemas.js.map