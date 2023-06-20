"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloakModule = void 0;
const lisk_sdk_1 = require("lisk-sdk");
const lisk_utils_1 = require("@liskhq/lisk-utils");
const lisk_validator_1 = require("@liskhq/lisk-validator");
const endpoint_1 = require("./endpoint");
const method_1 = require("./method");
const constants_1 = require("./constants");
const swap_1 = require("./stores/swap");
const swapEvents_1 = require("./events/swapEvents");
const internal_method_1 = require("./internal_method");
const openSwap_1 = require("./commands/openSwap");
const closeSwap_1 = require("./commands/closeSwap");
const redeemSwap_1 = require("./commands/redeemSwap");
const schemas_1 = require("./schemas");
class CloakModule extends lisk_sdk_1.BaseModule {
    constructor() {
        super();
        this.endpoint = new endpoint_1.CloakEndpoint(this.stores, this.offchainStores);
        this.method = new method_1.CloakMethod(this.stores, this.events);
        this._openSwapCommand = new openSwap_1.OpenSwapCommand(this.stores, this.events);
        this._closeSwapCommand = new closeSwap_1.CloseSwapCommand(this.stores, this.events);
        this._redeemSwapCommand = new redeemSwap_1.RedeemSwapCommand(this.stores, this.events);
        this._internalMethod = new internal_method_1.InternalMethod(this.stores, this.events);
        this.commands = [this._openSwapCommand, this._closeSwapCommand, this._redeemSwapCommand];
        this.stores.register(swap_1.SwapStore, new swap_1.SwapStore(this.name, 0));
        this.events.register(swapEvents_1.OpenSwapEvent, new swapEvents_1.OpenSwapEvent(this.name));
        this.events.register(swapEvents_1.CloseSwapEvent, new swapEvents_1.CloseSwapEvent(this.name));
        this.events.register(swapEvents_1.RedeemSwapEvent, new swapEvents_1.RedeemSwapEvent(this.name));
    }
    addDependencies(tokenMethod, feeMethod) {
        this._internalMethod.addDependencies(tokenMethod, feeMethod);
    }
    metadata() {
        return {
            ...this.baseMetadata(),
            endpoints: [
                {
                    name: this.endpoint.getSwap.name,
                    request: schemas_1.getSwapRequestSchema,
                    response: schemas_1.swapSchema,
                },
                {
                    name: this.endpoint.getInitializationFees.name,
                    response: schemas_1.getInitializationFeesResponseSchema,
                },
            ],
            assets: [],
        };
    }
    async init(args) {
        const { moduleConfig } = args;
        const rawConfig = lisk_utils_1.objects.mergeDeep({}, constants_1.defaultConfig, moduleConfig);
        lisk_validator_1.validator.validate(schemas_1.configSchema, rawConfig);
        const config = {
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
exports.CloakModule = CloakModule;
//# sourceMappingURL=module.js.map