import { BaseModule, ModuleMetadata, FeeMethod, TokenMethod, ModuleInitArgs } from 'lisk-sdk';
import { CloakEndpoint } from './endpoint';
import { CloakMethod } from './method';
import { OpenSwapCommand } from './commands/openSwap';
import { CloseSwapCommand } from './commands/closeSwap';
import { RedeemSwapCommand } from './commands/redeemSwap';
export declare class CloakModule extends BaseModule {
    endpoint: CloakEndpoint;
    method: CloakMethod;
    private readonly _openSwapCommand;
    private readonly _closeSwapCommand;
    private readonly _redeemSwapCommand;
    private readonly _internalMethod;
    commands: (OpenSwapCommand | CloseSwapCommand | RedeemSwapCommand)[];
    constructor();
    addDependencies(tokenMethod: TokenMethod, feeMethod: FeeMethod): void;
    metadata(): ModuleMetadata;
    init(args: ModuleInitArgs): Promise<void>;
}
