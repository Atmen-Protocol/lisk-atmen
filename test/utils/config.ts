import { Config } from "@oclif/core";

import pJSON = require("../../package.json");

export const getConfig = async () => {
    const config = await Config.load();
    config.pjson.lisk = { addressPrefix: "lsk" };
    config.pjson.version = pJSON.version;
    return config;
};
export const loggerMock = {
    trace: (_data?: object | unknown, _message?: string): void => {},
    debug: (_data?: object | unknown, _message?: string): void => {},
    info: (_data?: object | unknown, _message?: string): void => {},
    warn: (_data?: object | unknown, _message?: string): void => {},
    error: (_data?: object | unknown, _message?: string): void => {},
    fatal: (_data?: object | unknown, _message?: string): void => {},
    level: (): number => 2,
};
