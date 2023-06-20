/// <reference types="node" />
import { BaseCommand, CommandExecuteContext, CommandVerifyContext, VerificationResult } from 'lisk-sdk';
import { InternalMethod } from '../internal_method';
interface Params {
    swapID: Buffer;
}
export declare class RedeemSwapCommand extends BaseCommand {
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
