import { validator } from "@liskhq/lisk-validator";
import { BaseCommand, CommandExecuteContext, CommandVerifyContext, VerificationResult, VerifyStatus } from "lisk-sdk";
import { closeSwapParamsSchema } from "../schemas";
import { SwapStore } from "../stores/swap";
import { InternalMethod } from "../internal_method";

interface Params {
    swapID: Buffer;
    secret: Buffer;
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
            throw new Error(`Swap with ID ${params.swapID.toString("hex")} does not exist.`);
        }

        const swap = await swapStore.get(context, params.swapID);
        if (swap.timelock <= context.header.timestamp) {
            throw new Error("Timelock value must be in the future.");
        }
        const commitID = this._internalMethod.commitmentFromSecret(params.secret);
        if (!commitID.equals(params.swapID)) {
            throw new Error("Commitment verification failed.");
        }

        return {
            status: VerifyStatus.OK,
        };
    }

    public async execute(context: CommandExecuteContext<Params>): Promise<void> {
        const { transaction, params } = context;
        this._internalMethod._closeSwap(context.getMethodContext(), transaction.senderAddress, params.swapID, params.secret);
    }
}
