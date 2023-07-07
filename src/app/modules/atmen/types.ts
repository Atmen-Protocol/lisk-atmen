import { JSONObject } from "lisk-sdk";
export type TokenID = Buffer;
export interface Swap {
    timelock: number;
    tokenID: Buffer;
    value: bigint;
    senderAddress: Buffer;
    recipientAddress: Buffer;
    tip: bigint;
}

export interface SwapEvent extends Swap {
    swapID: Buffer;
    secret: Buffer;
}

export class NotFoundError extends Error {}
export type ModuleConfigJSON = JSONObject<ModuleConfig>;

// export interface FeeMethod {
//     payFee(methodContext: MethodContext, amount: bigint): void;
// }

// export interface TokenMethod {
//     transfer(methodContext: MethodContext, senderAddress: Buffer, recipientAddress: Buffer, tokenID: Buffer, amount: bigint): Promise<void>;
//     lock(methodContext: MethodContext, address: Buffer, module: string, tokenID: Buffer, amount: bigint): Promise<void>;
//     unlock(methodContext: MethodContext, address: Buffer, module: string, tokenID: Buffer, amount: bigint): Promise<void>;
//     initializeUserAccount(methodContext: MethodContext, address: Buffer, tokenID: Buffer): Promise<void>;
//     getAvailableBalance(methodContext: ImmutableMethodContext, address: Buffer, tokenID: Buffer): Promise<bigint>;
//     userAccountExists(methodContext: ImmutableMethodContext, address: Buffer, tokenID: Buffer): Promise<boolean>;
// }

export interface ModuleConfig {
    swapInitializationFee: bigint;
}
