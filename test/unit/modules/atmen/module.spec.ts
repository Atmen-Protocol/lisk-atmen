import { AtmenModule } from "../../../../src/app/modules/atmen/module";
import { defaultConfig } from "../../../../src/app/modules/atmen/constants";

describe("CloakModule", () => {
    let cloakModule!: AtmenModule;
    let genesisConfig: any;
    let moduleConfig: any;
    let endpointConfig: any;

    beforeEach(async () => {
        genesisConfig = {};
        moduleConfig = defaultConfig;
        cloakModule = new AtmenModule();
        await cloakModule.init({ genesisConfig, moduleConfig });
        endpointConfig = cloakModule.endpoint["_moduleConfig"];
    });

    describe("init", () => {
        it("should initialize config with default value when module config is empty", async () => {
            await expect(cloakModule.init({ genesisConfig, moduleConfig: {} })).resolves.toEqual(undefined);
            endpointConfig = cloakModule.endpoint["_moduleConfig"];
            expect(endpointConfig.swapInitializationFee.toString()).toEqual(defaultConfig.swapInitializationFee);
        });

        it("should set the swapInitializationFee property", async () => {
            expect(endpointConfig.swapInitializationFee.toString()).toEqual(defaultConfig.swapInitializationFee);
        });

        it("should call method and endpoint init", async () => {
            cloakModule = new AtmenModule();
            // Spy on init functions
            jest.spyOn(cloakModule.endpoint, "init");
            await cloakModule.init({ genesisConfig, moduleConfig });

            expect(cloakModule.endpoint.init).toHaveBeenCalled();
        });
    });
});
