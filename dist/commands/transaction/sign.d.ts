import { TransactionSignCommand } from 'lisk-commander';
import { Application, PartialApplicationConfig } from 'lisk-sdk';
type SignFlags = typeof TransactionSignCommand.flags & {
    [key: string]: Record<string, unknown>;
};
export declare class SignCommand extends TransactionSignCommand {
    static flags: SignFlags;
    static args: {
        name: string;
        required: boolean;
        description: string;
    }[];
    getApplication(config: PartialApplicationConfig): Application;
}
export {};
