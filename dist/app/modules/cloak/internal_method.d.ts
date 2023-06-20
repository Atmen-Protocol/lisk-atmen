/// <reference types="node" />
import { MethodContext, BaseMethod } from 'lisk-sdk';
import { FeeMethod, TokenMethod, Swap, ModuleConfig } from './types';
export declare class InternalMethod extends BaseMethod {
    private _tokenMethod;
    private _feeMethod;
    private _config;
    init(config: ModuleConfig): void;
    addDependencies(tokenMethod: TokenMethod, feeMethod: FeeMethod): void;
    commitmentToAddress(xCoordinate: Buffer, yCoordinate: Buffer): Buffer;
    commitmentFromSecret(secretKey: Buffer): [Buffer, Buffer];
    _openSwap(methodContext: MethodContext, swapID: Buffer, swap: Swap): Promise<void>;
    _closeSwap(methodContext: MethodContext, swapID: Buffer, secretKey: Buffer): Promise<void>;
    _redeemSwap(methodContext: MethodContext, swapID: Buffer): Promise<void>;
}
