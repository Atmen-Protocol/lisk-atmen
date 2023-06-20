"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommand = void 0;
const lisk_commander_1 = require("lisk-commander");
const app_1 = require("../../app/app");
class CreateCommand extends lisk_commander_1.TransactionCreateCommand {
    getApplication(config) {
        const app = (0, app_1.getApplication)(config);
        return app;
    }
}
CreateCommand.flags = {
    ...lisk_commander_1.TransactionCreateCommand.flags,
};
CreateCommand.args = [...lisk_commander_1.TransactionCreateCommand.args];
exports.CreateCommand = CreateCommand;
//# sourceMappingURL=create.js.map