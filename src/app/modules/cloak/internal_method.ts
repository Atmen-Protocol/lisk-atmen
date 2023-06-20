import { ProjectivePoint } from './secp256k1';
import { ethers } from 'ethers';
import { MethodContext, BaseMethod } from 'lisk-sdk';
import { OpenSwapEvent, CloseSwapEvent, RedeemSwapEvent } from './events/swapEvents';

import { SwapStore } from './stores/swap';
import { FeeMethod, TokenMethod, Swap, ModuleConfig } from './types';
import { UINT256_LENGTH, CLOAK_MODULE_NAME, ADDRESS_LENGTH } from './constants';

export class InternalMethod extends BaseMethod {
	private _tokenMethod!: TokenMethod;
	private _feeMethod!: FeeMethod;
	private _config!: ModuleConfig;

	public init(config: ModuleConfig): void {
		this._config = config;
	}

	public addDependencies(tokenMethod: TokenMethod, feeMethod: FeeMethod) {
		this._tokenMethod = tokenMethod;
		this._feeMethod = feeMethod;
	}
	public commitmentToAddress(xCoordinate: Buffer, yCoordinate: Buffer): Buffer {
		const address = Buffer.from(
			(
				BigInt(ethers.solidityPackedKeccak256(['bytes', 'bytes'], [xCoordinate, yCoordinate])) &
				BigInt('0x00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
			).toString(16),
			'hex',
		).subarray(0, ADDRESS_LENGTH);

		return address;
	}

	public commitmentFromSecret(secretKey: Buffer): [Buffer, Buffer] {
		const point = ProjectivePoint.BASE.mul(BigInt('0x' + secretKey.toString('hex')));
		const commX = Buffer.from(point.x.toString(16), 'hex');
		const commY = Buffer.from(point.y.toString(16), 'hex');
		return [commX, commY];
	}

	public async _openSwap(methodContext: MethodContext, swapID: Buffer, swap: Swap): Promise<void> {
		this._feeMethod.payFee(methodContext, this._config.swapInitializationFee);
		this._tokenMethod.lock(
			methodContext,
			swap.senderAddress,
			CLOAK_MODULE_NAME,
			swap.tokenID,
			swap.value,
		);
		await this.stores.get(SwapStore).set(methodContext, swapID, swap);
		const swapEvent = {
			...swap,
			swapID: swapID,
			secretKey: Buffer.alloc(UINT256_LENGTH),
		};

		this.events.get(OpenSwapEvent).log(methodContext, swapEvent);
	}

	public async _closeSwap(
		methodContext: MethodContext,
		swapID: Buffer,
		secretKey: Buffer,
	): Promise<void> {
		const swapStore = this.stores.get(SwapStore);
		const swap = await swapStore.get(methodContext, swapID);

		this._tokenMethod.unlock(
			methodContext,
			swap.senderAddress,
			CLOAK_MODULE_NAME,
			swap.tokenID,
			swap.value,
		);

		this._tokenMethod.transfer(
			methodContext,
			swap.senderAddress,
			swap.recipientAddress,
			swap.tokenID,
			swap.value,
		);

		await swapStore.del(methodContext, swapID);

		const swapEvent = {
			...swap,
			swapID: swapID,
			secretKey: secretKey,
		};
		this.events.get(CloseSwapEvent).log(methodContext, swapEvent);
	}

	public async _redeemSwap(methodContext: MethodContext, swapID: Buffer): Promise<void> {
		const swapStore = this.stores.get(SwapStore);
		const swap = await swapStore.get(methodContext, swapID);

		this._tokenMethod.unlock(
			methodContext,
			swap.senderAddress,
			CLOAK_MODULE_NAME,
			swap.tokenID,
			swap.value,
		);

		await swapStore.del(methodContext, swapID);

		const swapEvent = {
			...swap,
			swapID: swapID,
			secretKey: Buffer.alloc(UINT256_LENGTH),
		};
		this.events.get(RedeemSwapEvent).log(methodContext, swapEvent);
	}
}
