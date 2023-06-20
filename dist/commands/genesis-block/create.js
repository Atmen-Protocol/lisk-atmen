"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisBlockCommand = void 0;
const lisk_commander_1 = require("lisk-commander");
const path_1 = require("path");
const app_1 = require("../../app/app");
class GenesisBlockCommand extends lisk_commander_1.BaseGenesisBlockCommand {
    getApplication(config) {
        const app = (0, app_1.getApplication)(config);
        return app;
    }
    getApplicationConfigDir() {
        return (0, path_1.join)(__dirname, '../../../config');
    }
}
exports.GenesisBlockCommand = GenesisBlockCommand;
//# sourceMappingURL=create.js.map