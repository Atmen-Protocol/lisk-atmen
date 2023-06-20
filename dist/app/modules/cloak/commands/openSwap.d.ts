/// <reference types="node" />
import { BaseCommand, CommandExecuteContext, CommandVerifyContext, VerificationResult } from 'lisk-sdk';
import { InternalMethod } from '../internal_method';
import { TokenID } from '../types';
interface Params {
    swapID: Buffer;
    tokenID: TokenID;
    value: bigint;
    recipientAddress: Buffer;
    timelock: number;
}
export declare class OpenSwapCommand extends BaseCommand {
    schema: {
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
    private _internalMethod;
    init(args: {
        internalMethod: InternalMethod;
    }): void;
    verify(context: CommandVerifyContext<Params>): Promise<VerificationResult>;
    execute(context: CommandExecuteContext<Params>): Promise<void>;
}
export {};
