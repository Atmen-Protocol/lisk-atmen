import { validator } from '@liskhq/lisk-validator';
import {
	BaseCommand,
	CommandExecuteContext,
	CommandVerifyContext,
	VerificationResult,
	VerifyStatus,
} from 'lisk-sdk';
import { openSwapParamsSchema } from '../schemas';
import { SwapStore } from '../stores/swap';
import { InternalMethod } from '../internal_method';
import { TokenID, Swap } from '../types';

interface Params {
	swapID: Buffer;
	tokenID: TokenID;
	value: bigint;
	recipientAddress: Buffer;
	timelock: number;
}

export class OpenSwapCommand extends BaseCommand {
	public schema = openSwapParamsSchema;
	private _internalMethod!: InternalMethod;

	public init(args: { internalMethod: InternalMethod }) {
		this._internalMethod = args.internalMethod;
	}

	public async verify(context: CommandVerifyContext<Params>): Promise<VerificationResult> {
		const { params, logger } = context;

		validator.validate<Params>(openSwapParamsSchema, params);

		// const _swapID = this._internalMethod.commitmentToAddress(params.qx, params.qy);
		logger.info(`\nOpen Swap: swapID: ${params.swapID.toString('hex')}`);

		const swapStore = this.stores.get(SwapStore);

		const swapExists = await swapStore.has(context, params.swapID);
		if (swapExists) {
			throw new Error(`Swap with ID ${params.swapID.toString('hex')} already exists.`);
		}

		if (params.timelock <= context.header.timestamp) {
			logger.info(`\n\nparams.timelock: ${params.timelock}`);
			logger.info(`\n\ncontext.header.timestamp: ${context.header.timestamp}`);
			throw new Error('Timelock value must be in the future.');
		}

		return {
			status: VerifyStatus.OK,
		};
	}

	public async execute(context: CommandExecuteContext<Params>): Promise<void> {
		const { params } = context;

		const swap = {
			timelock: params.timelock,
			tokenID: params.tokenID,
			value: params.value,
			senderAddress: context.transaction.senderAddress,
			recipientAddress: params.recipientAddress,
		} as Swap;

		await this._internalMethod._openSwap(context.getMethodContext(), params.swapID, swap);
	}
}
