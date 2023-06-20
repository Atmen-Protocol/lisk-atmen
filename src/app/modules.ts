/* eslint-disable @typescript-eslint/no-empty-function */
import { Application } from 'lisk-sdk';
import { CloakModule } from './modules/cloak/module';

export const registerModules = (app: Application, method): void => {
	const cloakModule = new CloakModule();
	cloakModule.addDependencies(method.token, method.fee);
	app.registerModule(cloakModule);
};
