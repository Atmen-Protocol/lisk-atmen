import { TOKEN_ID_LENGTH, ADDRESS_LENGTH, UINT256_LENGTH, SWAP_ID_LENGTH } from "./constants";

export const swapSchema = {
    $id: "/atmen/swap",
    type: "object",
    required: ["tokenID", "value", "senderAddress", "recipientAddress", "timelock", "tip"],
    properties: {
        tokenID: {
            dataType: "bytes",
            fieldNumber: 1,
            minLength: TOKEN_ID_LENGTH,
            maxLength: TOKEN_ID_LENGTH,
        },
        value: {
            dataType: "uint64",
            minimum: 1,
            fieldNumber: 2,
        },
        senderAddress: {
            dataType: "bytes",
            fieldNumber: 3,
            minLength: ADDRESS_LENGTH,
            maxLength: ADDRESS_LENGTH,
        },
        recipientAddress: {
            dataType: "bytes",
            fieldNumber: 4,
            minLength: ADDRESS_LENGTH,
            maxLength: ADDRESS_LENGTH,
        },
        timelock: {
            dataType: "uint32",
            fieldNumber: 5,
        },
        tip: {
            dataType: "uint64",
            fieldNumber: 6,
        },
    },
};

export const openSwapParamsSchema = {
    $id: "/atmen/openSwapParams",
    type: "object",
    required: ["swapID", "tokenID", "value", "recipientAddress", "timelock", "tip"],
    properties: {
        swapID: {
            dataType: "bytes",
            minLength: UINT256_LENGTH,
            maxLength: UINT256_LENGTH,
            fieldNumber: 1,
        },
        tokenID: {
            dataType: "bytes",
            fieldNumber: 2,
            minLength: TOKEN_ID_LENGTH,
            maxLength: TOKEN_ID_LENGTH,
        },
        value: {
            dataType: "uint64",
            minimum: 1,
            fieldNumber: 3,
        },
        recipientAddress: {
            dataType: "bytes",
            fieldNumber: 4,
            minLength: ADDRESS_LENGTH,
            maxLength: ADDRESS_LENGTH,
        },
        timelock: {
            dataType: "uint32",
            minimum: 1,
            fieldNumber: 5,
        },
        tip: {
            dataType: "uint64",
            fieldNumber: 6,
        },
    },
};

export const closeSwapParamsSchema = {
    $id: "/atmen/closeSwapParams",
    type: "object",
    required: ["swapID", "secret"],
    properties: {
        swapID: {
            dataType: "bytes",
            minLength: SWAP_ID_LENGTH,
            maxLength: SWAP_ID_LENGTH,
            fieldNumber: 1,
        },
        secret: {
            dataType: "bytes",
            minLength: UINT256_LENGTH,
            maxLength: UINT256_LENGTH,
            fieldNumber: 2,
        },
    },
};
export const redeemSwapParamsSchema = {
    $id: "/atmen/redeemSwapParams",
    type: "object",
    required: ["swapID"],
    properties: {
        swapID: {
            dataType: "bytes",
            minLength: SWAP_ID_LENGTH,
            maxLength: SWAP_ID_LENGTH,
            fieldNumber: 1,
        },
    },
};

export const swapEventSchema = {
    $id: "/atmen/swapEvent",
    type: "object",
    properties: {
        ...swapSchema.properties,
        swapID: {
            dataType: "bytes",
            fieldNumber: 7,
            minLength: SWAP_ID_LENGTH,
            maxLength: SWAP_ID_LENGTH,
        },
        secret: {
            dataType: "bytes",
            fieldNumber: 8,
            minLength: UINT256_LENGTH,
            maxLength: UINT256_LENGTH,
        },
    },
    required: [...swapSchema.required, "swapID", "secret"],
};

export const getSwapRequestSchema = {
    $id: "/atmen/endpoint/getSwapRequest",
    type: "object",
    required: ["swapID"],
    properties: {
        swapID: {
            type: "string",
            format: "hex",
            minLength: SWAP_ID_LENGTH * 2,
            maxLength: SWAP_ID_LENGTH * 2,
        },
    },
};

export const getInitializationFeesResponseSchema = {
    $id: "/atmen/endpoint/getInitializationFees",
    type: "object",
    properties: {
        swap: {
            type: "string",
            format: "uint64",
        },
    },
    required: ["swap"],
};

export const configSchema = {
    $id: "/atmen/config",
    type: "object",
    properties: {
        swapInitializationFee: {
            type: "string",
            format: "uint64",
        },
    },
};

export const commitmentFromPointSchema = {
    $id: "/atmen/endpoint/commitmentFromPointSchema",
    type: "object",
    properties: {
        x: {
            type: "string",
            format: "hex",
        },
        y: {
            type: "string",
            format: "hex",
        },
    },
    required: ["x", "y"],
};
export const commitmentFromSecretSchema = {
    $id: "/atmen/endpoint/commitmentFromSecretSchema",
    type: "object",
    properties: {
        secret: {
            type: "string",
            format: "hex",
        },
    },
    required: ["secret"],
};
export const commitmentFromSharedSecretSchema = {
    $id: "/atmen/endpoint/commitmentFromSharedSecretSchema",
    type: "object",
    properties: {
        x: {
            type: "string",
            format: "hex",
        },
        y: {
            type: "string",
            format: "hex",
        },
        secret: {
            type: "string",
            format: "hex",
        },
    },
    required: ["x", "y", "secret"],
};

export const commitmentSchema = {
    $id: "/atmen/endpoint/commitmentSchema",
    type: "object",
    properties: {
        commitment: {
            type: "string",
            format: "hex",
        },
    },
    required: ["commitment"],
};
