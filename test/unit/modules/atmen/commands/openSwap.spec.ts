import { Transaction } from "@liskhq/lisk-chain";
import { codec } from "@liskhq/lisk-codec";
import { utils } from "@liskhq/lisk-cryptography";

import { VerifyStatus, testing } from "lisk-sdk";
import { validator } from "@liskhq/lisk-validator";
import { AtmenModule } from "../../../../../src/app/modules/atmen/module";
import { openSwapParamsSchema } from "../../../../../src/app/modules/atmen/schemas";
// import { defaultConfig } from "../../../../../src/app/modules/cloak/constants";
import { InternalMethod } from "../../../../../src/app/modules/atmen/internal_method";
import { OpenSwapCommand } from "../../../../../src/app/modules/atmen/commands/openSwap";
import { defaultConfig } from "../../../../../src/app/modules/atmen/constants";
import { SwapStore } from "../../../../../src/app/modules/atmen/stores/swap";
describe("Open swap command", () => {
    let cloakModule: AtmenModule;
    let genesisConfig: any;
    let moduleConfig: any;
    moduleConfig = defaultConfig;

    let command: OpenSwapCommand;
    let tokenMethod: any;
    let feeMethod: any;

    // const checkEventResult = (eventQueue: EventQueue, length: number, EventClass: any, index: number, expectedResult: any) => {
    //     expect(eventQueue.getEvents()).toHaveLength(length);
    //     expect(eventQueue.getEvents()[index].toObject().name).toEqual(new EventClass("token").name);

    //     const eventData = codec.decode<Record<string, unknown>>(new EventClass("token").schema, eventQueue.getEvents()[index].toObject().data);

    //     expect(eventData).toEqual({ ...expectedResult, result: 0 });
    // };

    beforeEach(async () => {
        cloakModule = new AtmenModule();
        await cloakModule.init({ genesisConfig, moduleConfig });
        const internalMethod = new InternalMethod(cloakModule.stores, cloakModule.events);
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
        command = new OpenSwapCommand(cloakModule.stores, cloakModule.events);
        internalMethod.addDependencies(tokenMethod, feeMethod);
        command.init({
            internalMethod,
        });
        command.addDependencies(tokenMethod);
    });

    describe("verify schema", () => {
        it("should fail when swapID does not have valid length", () => {
            expect(() =>
                validator.validate(command.schema, {
                    swapID: utils.getRandomBytes(31),
                    tokenID: Buffer.from("0000000100000000", "hex"),
                    value: BigInt(100000000),
                    recipientAddress: utils.getRandomBytes(20),
                    timelock: 32000,
                    tip: BigInt(0),
                })
            ).toThrow("Lisk validator found 1 error[s]:\nProperty '.swapID' minLength not satisfied");
        });

        it("should fail when tokenID does not have valid length", () => {
            expect(() =>
                validator.validate(command.schema, {
                    swapID: utils.getRandomBytes(32),
                    tokenID: Buffer.from("000000010000000022", "hex"),
                    value: BigInt(100000000),
                    recipientAddress: utils.getRandomBytes(20),
                    timelock: 32000,
                    tip: BigInt(100),
                })
            ).toThrow("Lisk validator found 1 error[s]:\nProperty '.tokenID' maxLength exceeded");
        });

        it("should fail when recipientAddress is not 20 btyes", () => {
            expect(() =>
                validator.validate(command.schema, {
                    swapID: utils.getRandomBytes(32),
                    tokenID: Buffer.from("0000000100000000", "hex"),
                    value: BigInt(100000000),
                    recipientAddress: utils.getRandomBytes(19),
                    timelock: 32000,
                    tip: BigInt(0),
                })
            ).toThrow("Lisk validator found 1 error[s]:\nProperty '.recipientAddress' minLength not satisfied");
        });
    });

    describe("verify", () => {
        it("should success when all parameters are valid", async () => {
            const params = {
                swapID: utils.getRandomBytes(32),
                tokenID: Buffer.from("0000000100000000", "hex"),
                value: BigInt(100000000),
                recipientAddress: utils.getRandomBytes(20),
                timelock: Math.floor(Date.now() / 1000) + 1000,
                tip: BigInt(0),
            };
            const context = testing.createTransactionContext({
                transaction: new Transaction({
                    module: "cloak",
                    command: "openSwap",
                    fee: BigInt(5000000),
                    nonce: BigInt(0),
                    senderPublicKey: utils.getRandomBytes(32),
                    params: codec.encode(openSwapParamsSchema, params),
                    signatures: [utils.getRandomBytes(64)],
                }),
            });

            const result = await command.verify(context.createCommandVerifyContext(openSwapParamsSchema));

            expect(result.status).toEqual(VerifyStatus.OK);
        });

        it("should fail if balance for the provided tokenID is insufficient", async () => {
            const params = {
                swapID: utils.getRandomBytes(32),
                tokenID: Buffer.from("0000000100000000", "hex"),
                value: BigInt(100000000),
                recipientAddress: utils.getRandomBytes(20),
                timelock: Math.floor(Date.now() / 1000) + 1000,
                tip: BigInt(0),
            };
            const availableBalance = params.value - BigInt(1);
            jest.spyOn(tokenMethod, "getAvailableBalance").mockResolvedValue(availableBalance);

            const context = testing.createTransactionContext({
                transaction: new Transaction({
                    module: "cloak",
                    command: "openSwap",
                    fee: BigInt(5000000),
                    nonce: BigInt(0),
                    senderPublicKey: utils.getRandomBytes(32),
                    params: codec.encode(openSwapParamsSchema, params),
                    signatures: [utils.getRandomBytes(64)],
                }),
            });
            await expect(command.verify(context.createCommandVerifyContext(openSwapParamsSchema))).rejects.toThrow(
                `Insufficient balance ${availableBalance} for token ${params.tokenID.toString("hex")}.`
            );
        });
    });

    describe("execute", () => {
        it("should initialize swap", async () => {
            const params = {
                swapID: utils.getRandomBytes(32),
                tokenID: Buffer.from("0000000100000000", "hex"),
                value: BigInt(100000000),
                recipientAddress: utils.getRandomBytes(20),
                timelock: Math.floor(Date.now() / 1000) + 1000,
                tip: BigInt(1),
            };
            const swapStore = cloakModule.stores.get(SwapStore);
            const context = testing.createTransactionContext({
                transaction: new Transaction({
                    module: "cloak",
                    command: "openSwap",
                    fee: BigInt(5000000),
                    nonce: BigInt(0),
                    senderPublicKey: utils.getRandomBytes(32),
                    params: codec.encode(openSwapParamsSchema, params),
                    signatures: [utils.getRandomBytes(64)],
                }),
            });

            // console.log(context.transaction, params, openSwapParamsSchema);

            await command.execute(context.createCommandExecuteContext(openSwapParamsSchema));
            const swap = await swapStore.get(context.stateStore, params.swapID);

            expect(swap.timelock).toEqual(params.timelock);
            expect(swap.value).toEqual(params.value);
            expect(swap.recipientAddress).toEqual(params.recipientAddress);
            expect(swap.tokenID).toEqual(params.tokenID);
            expect(swap.senderAddress).toEqual(context.transaction.senderAddress);
            expect(swap.tip).toEqual(params.tip);
        });
    });
});
