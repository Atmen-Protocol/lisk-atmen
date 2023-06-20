import { BaseEndpoint, ModuleEndpointContext, JSONObject } from 'lisk-sdk';
import { Swap, ModuleConfig } from './types';
export declare class CloakEndpoint extends BaseEndpoint {
    private _moduleConfig;
    init(moduleConfig: ModuleConfig): void;
    getSwap(_ctx: ModuleEndpointContext): Promise<JSONObject<Swap>>;
    getInitializationFees(): {
        swap: string;
    };
}
