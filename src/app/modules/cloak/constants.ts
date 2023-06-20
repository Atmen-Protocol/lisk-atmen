export const CLOAK_MODULE_NAME = 'cloak';
export const TOKEN_ID_LENGTH = 8;
export const ADDRESS_LENGTH = 20;
export const SWAP_ID_LENGTH = 20;
export const UINT256_LENGTH = 32;
export const SWAP_INITIALIZATION_FEE = BigInt(500000);

export const G =
	(Buffer.from('0xa6ecb3f599964fe04c72e486a8f90172493c21f4185f1ab9a7fe05659480c548', 'hex'),
	Buffer.from('0xdf67fd3f4255826c234a5262adc70e14a6d42f13ee55b65e885e666e1dd5d3f5', 'hex'));
export const G_Y_PARITY = 28;

export const defaultConfig = {
	swapInitializationFee: SWAP_INITIALIZATION_FEE.toString(),
};
