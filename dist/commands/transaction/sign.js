"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignCommand = void 0;
const lisk_commander_1 = require("lisk-commander");
const app_1 = require("../../app/app");
class SignCommand extends lisk_commander_1.TransactionSignCommand {
    getApplication(config) {
        const app = (0, app_1.getApplication)(config);
        return app;
    }
}
SignCommand.flags = {
    ...lisk_commander_1.TransactionSignCommand.flags,
};
SignCommand.args = [...lisk_commander_1.TransactionSignCommand.args];
exports.SignCommand = SignCommand;
//# sourceMappingURL=sign.js.map