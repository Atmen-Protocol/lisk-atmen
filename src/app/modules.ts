/* eslint-disable @typescript-eslint/no-empty-function */
import { Application } from "lisk-sdk";
import { AtmenModule } from "./modules/atmen/module";

export const registerModules = (app: Application, method): void => {
    const atmenModule = new AtmenModule();
    atmenModule.addDependencies(method.token, method.fee);
    app.registerModule(atmenModule);
};
