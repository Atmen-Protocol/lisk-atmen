"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerModules = void 0;
const module_1 = require("./modules/cloak/module");
const registerModules = (app, method) => {
    const cloakModule = new module_1.CloakModule();
    cloakModule.addDependencies(method.token, method.fee);
    app.registerModule(cloakModule);
};
exports.registerModules = registerModules;
//# sourceMappingURL=modules.js.map