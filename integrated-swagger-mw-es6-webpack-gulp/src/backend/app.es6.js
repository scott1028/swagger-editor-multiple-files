'use strict';

import express from 'express';

import jsonServerRouterFactory from './json-server';
import defaultRouterFactory from './default';
import swaggerRouterFactory from './swagger';

const app = express();

// Hook Router
jsonServerRouterFactory(app);
defaultRouterFactory(app);
swaggerRouterFactory(app);

export default app;
