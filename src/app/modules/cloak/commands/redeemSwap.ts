import { validator } from '@liskhq/lisk-validator';
import {
	BaseCommand,
	CommandExecuteContext,
	CommandVerifyContext,
	VerificationResult,
	VerifyStatus,
} from 'lisk-sdk';
import { redeemSwapParamsSchema } from '../schemas';
import { SwapStore } from '../stores/swap';
import { InternalMethod } from '../internal_method';

interface Params {
	swapID: Buffer;
}

export class RedeemSwapCommand extends BaseCommand {
	public schema = redeemSwapParamsSchema;
	private _internalMethod!: InternalMethod;

	public init(args: { internalMethod: InternalMethod }) {
		this._internalMethod = args.internalMethod;
	}

	public async verify(context: CommandVerifyContext<Params>): Promise<VerificationResult> {
		const { params } = context;

		validator.validate<Params>(redeemSwapParamsSchema, params);

		const swapStore = this.stores.get(SwapStore);

		const swapExists = await swapStore.has(context, params.swapID);
		if (!swapExists) {
			throw new Error(`Swap with ID ${params.swapID} does not exist.`);
		}

		const swap = await swapStore.get(context, params.swapID);
		if (swap.timelock > context.header.timestamp) {
			throw new Error('Swap is not expired: timelock value must be in the past.');
		}

		return {
			status: VerifyStatus.OK,
		};
	}

	public async execute(context: CommandExecuteContext<Params>): Promise<void> {
		const { params } = context;
		this._internalMethod._redeemSwap(context.getMethodContext(), params.swapID);
	}
}
