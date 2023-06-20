"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloakPlugin = void 0;
const lisk_sdk_1 = require("lisk-sdk");
class CloakPlugin extends lisk_sdk_1.BasePlugin {
    get nodeModulePath() {
        return __filename;
    }
    async load() { }
    async unload() { }
}
exports.CloakPlugin = CloakPlugin;
//# sourceMappingURL=cloak_plugin.js.map