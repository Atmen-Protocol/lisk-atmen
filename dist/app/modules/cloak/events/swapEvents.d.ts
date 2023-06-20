import { BaseEvent, EventQueuer } from 'lisk-sdk';
import { SwapEvent } from '../types';
export declare class OpenSwapEvent extends BaseEvent<SwapEvent> {
    schema: {
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
    log(ctx: EventQueuer, data: SwapEvent): void;
}
export declare class CloseSwapEvent extends BaseEvent<SwapEvent> {
    schema: {
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
    log(ctx: EventQueuer, data: SwapEvent): void;
}
export declare class RedeemSwapEvent extends BaseEvent<SwapEvent> {
    schema: {
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
    log(ctx: EventQueuer, data: SwapEvent): void;
}
