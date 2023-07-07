import { validator } from "@liskhq/lisk-validator";
import { BaseCommand, CommandExecuteContext, CommandVerifyContext, VerificationResult, VerifyStatus } from "lisk-sdk";
import { openSwapParamsSchema } from "../schemas";
import { SwapStore } from "../stores/swap";
import { InternalMethod } from "../internal_method";
import { TokenID, Swap } from "../types";
import { TokenMethod } from "lisk-sdk";

interface Params {
    swapID: Buffer;
    tokenID: TokenID;
    value: bigint;
    recipientAddress: Buffer;
    timelock: number;
    tip: bigint;
}

export class OpenSwapCommand extends BaseCommand {
    public schema = openSwapParamsSchema;
    private _tokenMethod!: TokenMethod;
    private _internalMethod!: InternalMethod;

    public init(args: { internalMethod: InternalMethod }) {
        this._internalMethod = args.internalMethod;
    }

    public addDependencies(tokenMethod: TokenMethod) {
        this._tokenMethod = tokenMethod;
    }

    public async verify(context: CommandVerifyContext<Params>): Promise<VerificationResult> {
        const { params, logger } = context;

        validator.validate<Params>(openSwapParamsSchema, params);
        const availableBalance = await this._tokenMethod.getAvailableBalance(context.getMethodContext(), context.transaction.senderAddress, params.tokenID);
        if (availableBalance < params.value) {
            throw new Error(`Insufficient balance ${availableBalance} for token ${params.tokenID.toString("hex")}.`);
        }

        if (params.tip >= params.value) {
            throw new Error("Tip must be less than value.");
        }

        const swapStore = this.stores.get(SwapStore);

        const swapExists = await swapStore.has(context, params.swapID);
        if (swapExists) {
            throw new Error(`Swap with ID ${params.swapID.toString("hex")} already exists.`);
        }

        if (params.timelock <= context.header.timestamp) {
            logger.info(`\n\nparams.timelock: ${params.timelock}`);
            logger.info(`\n\ncontext.header.timestamp: ${context.header.timestamp}`);
            throw new Error("Timelock value must be in the future.");
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
            tip: params.tip,
        } as Swap;

        await this._internalMethod._openSwap(context.getMethodContext(), params.swapID, swap);
    }
}
