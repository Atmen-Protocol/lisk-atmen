import { FlagInput } from '@oclif/core/lib/interfaces';
import { BaseStartCommand } from 'lisk-commander';
import { Application, PartialApplicationConfig } from 'lisk-sdk';
type StartFlags = typeof BaseStartCommand.flags & FlagInput<any>;
export declare class StartCommand extends BaseStartCommand {
    static flags: StartFlags;
    getApplication(config: PartialApplicationConfig): Promise<Application>;
    getApplicationConfigDir(): string;
}
export {};
