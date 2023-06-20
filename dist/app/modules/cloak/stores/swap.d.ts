/// <reference types="node" />
import { BaseStore, ImmutableStoreGetter } from 'lisk-sdk';
import { Swap } from '../types';
export declare class SwapStore extends BaseStore<Swap> {
    schema: {
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
    getOrDefault(context: ImmutableStoreGetter, swapID: Buffer): Promise<Swap | {
        tokenID: Buffer;
        value: bigint;
        sender: Buffer;
        recipient: Buffer;
        timelock: bigint;
    }>;
}
