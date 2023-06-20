import { BasePlugin } from 'lisk-sdk';
export declare class CloakPlugin extends BasePlugin {
    get nodeModulePath(): string;
    load(): Promise<void>;
    unload(): Promise<void>;
}
