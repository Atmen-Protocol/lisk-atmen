export declare const swapSchema: {
    $id: string;
    type: string;
    properties: {
        tokenID: {
            dataType: string;
            fieldNumber: number;
            minLength: number;
            maxLength: number;
        };
        value: {
            dataType: string;
            minimum: number;
            fieldNumber: number;
        };
        senderAddress: {
            dataType: string;
            fieldNumber: number;
            minLength: number;
            maxLength: number;
        };
        recipientAddress: {
            dataType: string;
            fieldNumber: number;
            minLength: number;
            maxLength: number;
        };
        timelock: {
            dataType: string;
            fieldNumber: number;
        };
    };
    required: string[];
};
export declare const openSwapParamsSchema: {
    $id: string;
    type: string;
    required: string[];
    properties: {
        swapID: {
            dataType: string;
            minLength: number;
            maxLength: number;
            fieldNumber: number;
        };
        tokenID: {
            dataType: string;
            fieldNumber: number;
            minLength: number;
            maxLength: number;
        };
        value: {
            dataType: string;
            minimum: number;
            fieldNumber: number;
        };
        recipientAddress: {
            dataType: string;
            fieldNumber: number;
            minLength: number;
            maxLength: number;
        };
        timelock: {
            dataType: string;
            minimum: number;
            fieldNumber: number;
        };
    };
};
export declare const closeSwapParamsSchema: {
    $id: string;
    type: string;
    required: string[];
    properties: {
        swapID: {
            dataType: string;
            minLength: number;
            maxLength: number;
            fieldNumber: number;
        };
        secretKey: {
            dataType: string;
            minLength: number;
            maxLength: number;
            fieldNumber: number;
        };
    };
};
export declare const redeemSwapParamsSchema: {
    $id: string;
    type: string;
    required: string[];
    properties: {
        swapID: {
            dataType: string;
            minLength: number;
            maxLength: number;
            fieldNumber: number;
        };
    };
};
export declare const swapEventSchema: {
    $id: string;
    type: string;
    properties: {
        swapID: {
            dataType: string;
            fieldNumber: number;
            minLength: number;
            maxLength: number;
        };
        secretKey: {
            dataType: string;
            fieldNumber: number;
            minLength: number;
            maxLength: number;
        };
        tokenID: {
            dataType: string;
            fieldNumber: number;
            minLength: number;
            maxLength: number;
        };
        value: {
            dataType: string;
            minimum: number;
            fieldNumber: number;
        };
        senderAddress: {
            dataType: string;
            fieldNumber: number;
            minLength: number;
            maxLength: number;
        };
        recipientAddress: {
            dataType: string;
            fieldNumber: number;
            minLength: number;
            maxLength: number;
        };
        timelock: {
            dataType: string;
            fieldNumber: number;
        };
    };
    required: string[];
};
export declare const getSwapRequestSchema: {
    $id: string;
    type: string;
    required: string[];
    properties: {
        swapID: {
            type: string;
            format: string;
            minLength: number;
            maxLength: number;
        };
    };
};
export declare const getInitializationFeesResponseSchema: {
    $id: string;
    type: string;
    properties: {
        swap: {
            type: string;
            format: string;
        };
    };
    required: string[];
};
export declare const configSchema: {
    $id: string;
    type: string;
    properties: {
        swapInitializationFee: {
            type: string;
            format: string;
        };
    };
};
