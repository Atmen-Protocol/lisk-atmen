/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/member-ordering */

import {
    BaseModule,
    ModuleMetadata,
    FeeMethod,
    TokenMethod,
    ModuleInitArgs,

    // InsertAssetContext,
    // BlockVerifyContext,
    // TransactionVerifyContext,
    // VerificationResult,
    // TransactionExecuteContext,
    // GenesisBlockExecuteContext,
    // BlockExecuteContext,
    // BlockAfterExecuteContext,
    // VerifyStatus,
} from "lisk-sdk";
import { objects } from "@liskhq/lisk-utils";
import { validator } from "@liskhq/lisk-validator";
import { AtmenEndpoint } from "./endpoint";
import { AtmenMethod } from "./method";
import { defaultConfig } from "./constants";
import { ModuleConfig, ModuleConfigJSON } from "./types";
import { SwapStore } from "./stores/swap";
import { OpenSwapEvent, CloseSwapEvent, RedeemSwapEvent } from "./events/swapEvents";
import { InternalMethod } from "./internal_method";
import { OpenSwapCommand } from "./commands/openSwap";
import { CloseSwapCommand } from "./commands/closeSwap";
import { RedeemSwapCommand } from "./commands/redeemSwap";
import {
    getSwapRequestSchema,
    swapSchema,
    getInitializationFeesResponseSchema,
    configSchema,
    commitmentFromSecretSchema,
    commitmentFromPointSchema,
    commitmentFromSharedSecretSchema,
    commitmentSchema,
} from "./schemas";

export class AtmenModule extends BaseModule {
    public endpoint = new AtmenEndpoint(this.stores, this.offchainStores);
    public method = new AtmenMethod(this.stores, this.events);

    private readonly _openSwapCommand = new OpenSwapCommand(this.stores, this.events);
    private readonly _closeSwapCommand = new CloseSwapCommand(this.stores, this.events);
    private readonly _redeemSwapCommand = new RedeemSwapCommand(this.stores, this.events);
    private readonly _internalMethod = new InternalMethod(this.stores, this.events);

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public commands = [this._openSwapCommand, this._closeSwapCommand, this._redeemSwapCommand];

    public constructor() {
        super();
        this.stores.register(SwapStore, new SwapStore(this.name, 0));
        this.events.register(OpenSwapEvent, new OpenSwapEvent(this.name));
        this.events.register(CloseSwapEvent, new CloseSwapEvent(this.name));
        this.events.register(RedeemSwapEvent, new RedeemSwapEvent(this.name));
    }

    public addDependencies(tokenMethod: TokenMethod, feeMethod: FeeMethod) {
        this._internalMethod.addDependencies(tokenMethod, feeMethod);
        this._openSwapCommand.addDependencies(tokenMethod);
        this.method.addDependencies(this._internalMethod);
        this.endpoint.addDependencies(this._internalMethod);
    }

    public metadata(): ModuleMetadata {
        return {
            ...this.baseMetadata(),
            endpoints: [
                {
                    name: this.endpoint.getSwap.name,
                    request: getSwapRequestSchema,
                    response: swapSchema,
                },
                {
                    name: this.endpoint.commitmentFromPoint.name,
                    request: commitmentFromPointSchema,
                    response: commitmentSchema,
                },
                {
                    name: this.endpoint.commitmentFromSecret.name,
                    request: commitmentFromSecretSchema,
                    response: commitmentSchema,
                },
                {
                    name: this.endpoint.commitmentFromSharedSecret.name,
                    request: commitmentFromSharedSecretSchema,
                    response: commitmentSchema,
                },

                {
                    name: this.endpoint.getInitializationFees.name,
                    response: getInitializationFeesResponseSchema,
                },
            ],
            assets: [],
        };
    }

    // Lifecycle hooks
    // eslint-disable-next-line @typescript-eslint/require-await
    public async init(args: ModuleInitArgs) {
        const { moduleConfig } = args;

        const rawConfig = objects.mergeDeep({}, defaultConfig, moduleConfig) as ModuleConfigJSON;
        validator.validate(configSchema, rawConfig);

        const config: ModuleConfig = {
            swapInitializationFee: BigInt(rawConfig.swapInitializationFee),
        };

        this._internalMethod.init(config);
        this.endpoint.init(config);

        this._openSwapCommand.init({
            internalMethod: this._internalMethod,
        });

        this._closeSwapCommand.init({
            internalMethod: this._internalMethod,
        });

        this._redeemSwapCommand.init({
            internalMethod: this._internalMethod,
        });
    }
}
