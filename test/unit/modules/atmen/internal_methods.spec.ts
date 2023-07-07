import { AtmenModule } from "../../../../src/app/modules/atmen/module";
import { defaultConfig } from "../../../../src/app/modules/atmen/constants";
import { InternalMethod } from "../../../../src/app/modules/atmen/internal_method";
import { ProjectivePoint } from "../../../../src/app/modules/atmen/secp256k1";

describe("Internal Methods", () => {
    let cloakModule!: AtmenModule;
    let genesisConfig: any;
    let moduleConfig: any;
    let feeMethod: any;
    let tokenMethod: any;
    let internalMethod: InternalMethod;

    beforeEach(async () => {
        genesisConfig = {};
        moduleConfig = defaultConfig;
        cloakModule = new AtmenModule();
        await cloakModule.init({ genesisConfig, moduleConfig });
        internalMethod = new InternalMethod(cloakModule.stores, cloakModule.events);
        internalMethod.init(moduleConfig);
        tokenMethod = {
            transfer: jest.fn(),
            getAvailableBalance: jest.fn(),
            lock: jest.fn(),
            unlock: jest.fn(),
            intializeUserAccount: jest.fn(),
            userAccountExists: jest.fn(),
        } as any;
        feeMethod = {
            payFee: jest.fn(),
        } as any;
        cloakModule.addDependencies(tokenMethod, feeMethod);
        internalMethod.addDependencies(tokenMethod, feeMethod);
    });

    describe("commitments", () => {
        it("should calculate the correct swapID from fixture", async () => {
            const secret = Buffer.from("1787f38d854231dfec2b27a0f621414d10bfa95970b3e576aed29e1e8287e51e", "hex");
            const swapID = internalMethod.commitmentFromSecret(secret);
            expect(swapID.toString("hex")).toEqual("000000000000000000000000b3dca5f0cab69500d9165dd025c3a7ff82dca55f");
        });
        it("should calculate the correct swapID from fixture", async () => {
            const secret = Buffer.from("ac9647afcb88196f1b7c20db07013832799a3028c1ed39af16e32aad7dfcb6cd", "hex");

            const point = ProjectivePoint.BASE.mul(BigInt("0x" + secret.toString("hex")));
            console.log(point.toAffine());
            const swapID = internalMethod.commitmentFromSecret(secret);
            expect(swapID.toString("hex")).toEqual("000000000000000000000000036df011776a4b41d214505f661b481e57ac8bd0");
        });
    });
});
