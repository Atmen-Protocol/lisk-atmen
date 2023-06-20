import { TransactionCreateCommand } from 'lisk-commander';
import { Application, PartialApplicationConfig } from 'lisk-sdk';
type CreateFlags = typeof TransactionCreateCommand.flags & {
    [key: string]: Record<string, unknown>;
};
export declare class CreateCommand extends TransactionCreateCommand {
    static flags: CreateFlags;
    static args: {
        name: string;
        required: boolean;
        description: string;
    }[];
    getApplication(config: PartialApplicationConfig): Application;
}
export {};
