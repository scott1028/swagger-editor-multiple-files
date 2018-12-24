'use strict';

import express from 'express';

import jsonServerRouterFactory from './json-server';
import defaultRouterFactory from './default';
import swaggerRouterFactory from './swagger';

const app = express();

// Hook Router
// Set router priority
// ref: https://stackoverflow.com/questions/8833418/express-js-how-to-make-express-static-have-higher-priority-than-the-rest-of-the/8838618#8838618
swaggerRouterFactory(app);
defaultRouterFactory(app);
jsonServerRouterFactory(app);

export default app;
