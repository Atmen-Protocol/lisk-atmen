"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCommand = void 0;
const core_1 = require("@oclif/core");
const lisk_commander_1 = require("lisk-commander");
const lisk_framework_forger_plugin_1 = require("@liskhq/lisk-framework-forger-plugin");
const lisk_framework_monitor_plugin_1 = require("@liskhq/lisk-framework-monitor-plugin");
const lisk_framework_report_misbehavior_plugin_1 = require("@liskhq/lisk-framework-report-misbehavior-plugin");
const lisk_framework_dashboard_plugin_1 = require("@liskhq/lisk-framework-dashboard-plugin");
const lisk_framework_faucet_plugin_1 = require("@liskhq/lisk-framework-faucet-plugin");
const path_1 = require("path");
const app_1 = require("../app/app");
const setPluginConfig = (config, flags) => {
    if (flags['monitor-plugin-port'] !== undefined) {
        config.plugins[lisk_framework_monitor_plugin_1.MonitorPlugin.name] = config.plugins[lisk_framework_monitor_plugin_1.MonitorPlugin.name] ?? {};
        config.plugins[lisk_framework_monitor_plugin_1.MonitorPlugin.name].port = flags['monitor-plugin-port'];
    }
    if (flags['monitor-plugin-whitelist'] !== undefined &&
        typeof flags['monitor-plugin-whitelist'] === 'string') {
        config.plugins[lisk_framework_monitor_plugin_1.MonitorPlugin.name] = config.plugins[lisk_framework_monitor_plugin_1.MonitorPlugin.name] ?? {};
        config.plugins[lisk_framework_monitor_plugin_1.MonitorPlugin.name].whiteList = flags['monitor-plugin-whitelist']
            .split(',')
            .filter(Boolean);
    }
    if (flags['faucet-plugin-port'] !== undefined) {
        config.plugins[lisk_framework_faucet_plugin_1.FaucetPlugin.name] = config.plugins[lisk_framework_faucet_plugin_1.FaucetPlugin.name] ?? {};
        config.plugins[lisk_framework_faucet_plugin_1.FaucetPlugin.name].port = flags['faucet-plugin-port'];
    }
    if (flags['dashboard-plugin-port'] !== undefined) {
        config.plugins[lisk_framework_dashboard_plugin_1.DashboardPlugin.name] = config.plugins[lisk_framework_dashboard_plugin_1.DashboardPlugin.name] ?? {};
        config.plugins[lisk_framework_dashboard_plugin_1.DashboardPlugin.name].port = flags['dashboard-plugin-port'];
    }
};
class StartCommand extends lisk_commander_1.BaseStartCommand {
    async getApplication(config) {
        const { flags } = await this.parse(StartCommand);
        setPluginConfig(config, flags);
        const app = (0, app_1.getApplication)(config);
        if (flags['enable-forger-plugin']) {
            app.registerPlugin(new lisk_framework_forger_plugin_1.ForgerPlugin(), { loadAsChildProcess: true });
        }
        if (flags['enable-monitor-plugin']) {
            app.registerPlugin(new lisk_framework_monitor_plugin_1.MonitorPlugin(), { loadAsChildProcess: true });
        }
        if (flags['enable-report-misbehavior-plugin']) {
            app.registerPlugin(new lisk_framework_report_misbehavior_plugin_1.ReportMisbehaviorPlugin(), { loadAsChildProcess: true });
        }
        if (flags['enable-faucet-plugin']) {
            app.registerPlugin(new lisk_framework_faucet_plugin_1.FaucetPlugin(), { loadAsChildProcess: true });
        }
        if (flags['enable-dashboard-plugin']) {
            app.registerPlugin(new lisk_framework_dashboard_plugin_1.DashboardPlugin(), { loadAsChildProcess: true });
        }
        return app;
    }
    getApplicationConfigDir() {
        return (0, path_1.join)(__dirname, '../../config');
    }
}
StartCommand.flags = {
    ...lisk_commander_1.BaseStartCommand.flags,
    'enable-forger-plugin': core_1.Flags.boolean({
        description: 'Enable Forger Plugin. Environment variable "LISK_ENABLE_FORGER_PLUGIN" can also be used.',
        env: 'LISK_ENABLE_FORGER_PLUGIN',
        default: false,
    }),
    'enable-monitor-plugin': core_1.Flags.boolean({
        description: 'Enable Monitor Plugin. Environment variable "LISK_ENABLE_MONITOR_PLUGIN" can also be used.',
        env: 'LISK_ENABLE_MONITOR_PLUGIN',
        default: false,
    }),
    'monitor-plugin-port': core_1.Flags.integer({
        description: 'Port to be used for Monitor Plugin. Environment variable "LISK_MONITOR_PLUGIN_PORT" can also be used.',
        env: 'LISK_MONITOR_PLUGIN_PORT',
        dependsOn: ['enable-monitor-plugin'],
    }),
    'monitor-plugin-whitelist': core_1.Flags.string({
        description: 'List of IPs in comma separated value to allow the connection. Environment variable "LISK_MONITOR_PLUGIN_WHITELIST" can also be used.',
        env: 'LISK_MONITOR_PLUGIN_WHITELIST',
        dependsOn: ['enable-monitor-plugin'],
    }),
    'enable-report-misbehavior-plugin': core_1.Flags.boolean({
        description: 'Enable ReportMisbehavior Plugin. Environment variable "LISK_ENABLE_REPORT_MISBEHAVIOR_PLUGIN" can also be used.',
        env: 'LISK_ENABLE_MONITOR_PLUGIN',
        default: false,
    }),
    'enable-faucet-plugin': core_1.Flags.boolean({
        description: 'Enable Faucet Plugin. Environment variable "LISK_ENABLE_FAUCET_PLUGIN" can also be used.',
        env: 'LISK_ENABLE_FAUCET_PLUGIN',
        default: false,
    }),
    'faucet-plugin-port': core_1.Flags.integer({
        description: 'Port to be used for Faucet Plugin. Environment variable "LISK_FAUCET_PLUGIN_PORT" can also be used.',
        env: 'LISK_FAUCET_PLUGIN_PORT',
        dependsOn: ['enable-faucet-plugin'],
    }),
    'enable-dashboard-plugin': core_1.Flags.boolean({
        description: 'Enable Dashboard Plugin. Environment variable "LISK_ENABLE_DASHBOARD_PLUGIN" can also be used.',
        env: 'LISK_ENABLE_DASHBOARD_PLUGIN',
        default: false,
    }),
    'dashboard-plugin-port': core_1.Flags.integer({
        description: 'Port to be used for Dashboard Plugin. Environment variable "LISK_DASHBOARD_PLUGIN_PORT" can also be used.',
        env: 'LISK_DASHBOARD_PLUGIN_PORT',
        dependsOn: ['enable-dashboard-plugin'],
    }),
};
exports.StartCommand = StartCommand;
//# sourceMappingURL=start.js.map