import { MethodContext, ImmutableMethodContext, JSONObject } from 'lisk-sdk';
export type TokenID = Buffer;
export interface Swap {
	timelock: number;
	tokenID: Buffer;
	value: bigint;
	senderAddress: Buffer;
	recipientAddress: Buffer;
}

export interface SwapEvent extends Swap {
	swapID: Buffer;
	secretKey: Buffer;
}

export class NotFoundError extends Error {}
export type ModuleConfigJSON = JSONObject<ModuleConfig>;
export interface FeeMethod {
	payFee(methodContext: MethodContext, amount: bigint): void;
}

export interface TokenMethod {
	transfer(
		methodContext: MethodContext,
		senderAddress: Buffer,
		recipientAddress: Buffer,
		tokenID: Buffer,
		amount: bigint,
	): void;
	lock(
		methodContext: MethodContext,
		address: Buffer,
		module: string,
		tokenID: Buffer,
		amount: bigint,
	): void;
	unlock(
		methodContext: MethodContext,
		address: Buffer,
		module: string,
		tokenID: Buffer,
		amount: bigint,
	): void;
	initializeUserAccount(methodContext: MethodContext, address: Buffer, tokenID: Buffer): void;
	userAccountExists(
		methodContext: ImmutableMethodContext,
		address: Buffer,
		tokenID: Buffer,
	): Promise<boolean>;
}

export interface ModuleConfig {
	swapInitializationFee: bigint;
}
