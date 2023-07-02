import { CloakModule } from "../../../../src/app/modules/cloak/module";
import { defaultConfig } from "../../../../src/app/modules/cloak/constants";

describe("CloakModule", () => {
    let cloakModule!: CloakModule;
    let genesisConfig: any;
    let moduleConfig: any;
    let endpointConfig: any;

    beforeEach(async () => {
        genesisConfig = {};
        moduleConfig = defaultConfig;
        cloakModule = new CloakModule();
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
            cloakModule = new CloakModule();
            // Spy on init functions
            jest.spyOn(cloakModule.endpoint, "init");
            await cloakModule.init({ genesisConfig, moduleConfig });

            expect(cloakModule.endpoint.init).toHaveBeenCalled();
        });
    });
});
