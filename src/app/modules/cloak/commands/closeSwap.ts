import { validator } from '@liskhq/lisk-validator';
import {
	BaseCommand,
	CommandExecuteContext,
	CommandVerifyContext,
	VerificationResult,
	VerifyStatus,
} from 'lisk-sdk';
import { closeSwapParamsSchema } from '../schemas';
import { SwapStore } from '../stores/swap';
import { InternalMethod } from '../internal_method';

interface Params {
	swapID: Buffer;
	secretKey: Buffer;
}

export class CloseSwapCommand extends BaseCommand {
	public schema = closeSwapParamsSchema;
	private _internalMethod!: InternalMethod;

	public init(args: { internalMethod: InternalMethod }) {
		this._internalMethod = args.internalMethod;
	}

	public async verify(context: CommandVerifyContext<Params>): Promise<VerificationResult> {
		const { params } = context;

		validator.validate<Params>(closeSwapParamsSchema, params);

		const swapStore = this.stores.get(SwapStore);

		const swapExists = await swapStore.has(context, params.swapID);
		if (!swapExists) {
			throw new Error(`Swap with ID ${params.swapID.toString('hex')} does not exist.`);
		}

		const swap = await swapStore.get(context, params.swapID);
		if (swap.timelock <= context.header.timestamp) {
			throw new Error('Timelock value must be in the future.');
		}
		const [commX, commY] = this._internalMethod.commitmentFromSecret(params.secretKey);
		const hashedCommitment = this._internalMethod.commitmentToAddress(commX, commY);
		if (!hashedCommitment.equals(params.swapID)) {
			throw new Error('Commitment verification failed.');
		}

		return {
			status: VerifyStatus.OK,
		};
	}

	public async execute(context: CommandExecuteContext<Params>): Promise<void> {
		const { params } = context;
		this._internalMethod._closeSwap(context.getMethodContext(), params.swapID, params.secretKey);
	}
}
