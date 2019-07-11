import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
	outputTargets: [
		{
			serviceWorker: null, // no service worer
			type: 'www',
		},
	],
};
