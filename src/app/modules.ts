/* eslint-disable @typescript-eslint/no-empty-function */
import {
    Application,
    AuthMethod,
    FeeMethod,
    TokenMethod,
    MainchainInteroperabilityMethod,
    PoSMethod,
    RandomMethod,
    SidechainInteroperabilityMethod,
    ValidatorsMethod,
} from "lisk-sdk";
import { AtmenModule } from "./modules/atmen/module";
import { DynamicRewardMethod } from "lisk-framework/dist-node/modules/dynamic_rewards";

export const registerModules = (
    app: Application,
    method: {
        validator?: ValidatorsMethod;
        auth?: AuthMethod;
        token: TokenMethod;
        fee: FeeMethod;
        random?: RandomMethod;
        reward?: DynamicRewardMethod;
        pos?: PoSMethod;
        interoperability?: SidechainInteroperabilityMethod | MainchainInteroperabilityMethod;
    }
): void => {
    const atmenModule = new AtmenModule();
    atmenModule.addDependencies(method.token, method.fee);
    app.registerModule(atmenModule);
};
