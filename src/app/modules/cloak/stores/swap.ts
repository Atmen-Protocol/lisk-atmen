import { NotFoundError } from '@liskhq/lisk-db';
import { BaseStore, ImmutableStoreGetter } from 'lisk-sdk';
import { Swap } from '../types';
import { swapSchema } from '../schemas';

export class SwapStore extends BaseStore<Swap> {
	public schema = swapSchema;

	public async getOrDefault(context: ImmutableStoreGetter, swapID: Buffer) {
		try {
			const swap = await this.get(context, swapID);
			return swap;
		} catch (error) {
			if (!(error instanceof NotFoundError)) {
				throw error;
			}

			return {
				tokenID: Buffer.alloc(0),
				value: BigInt(0),
				sender: Buffer.alloc(0),
				recipient: Buffer.alloc(0),
				timelock: BigInt(0),
			};
		}
	}
}
