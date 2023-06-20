import { BaseGenesisBlockCommand } from 'lisk-commander';
import { Application, PartialApplicationConfig } from 'lisk-sdk';
export declare class GenesisBlockCommand extends BaseGenesisBlockCommand {
    getApplication(config: PartialApplicationConfig): Application;
    getApplicationConfigDir(): string;
}
