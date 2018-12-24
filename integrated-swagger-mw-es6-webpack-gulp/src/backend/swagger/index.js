'use strict';

import SwaggerExpress from 'swagger-express-mw';
import SwaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../dist/swagger.yaml';  // handled by `js-yaml-loader` of webpack's loader

// integrated with swagger interactive doc mechanism
const SWAGGER_YAML = `dist/swagger.yaml`;

export default app => {
  if(process.env.NODE_ENV.includes('production'))
    return;

  SwaggerExpress.create({  // copy fragment source code from swagger CLI tool of nodejs, there is not any document for this.
    appRoot: __dirname, // required config
    swaggerFile: SWAGGER_YAML,  // according to trace `swagger-node` project
  }, function(err, swaggerExpress) {
    if (err) { throw err; }

    // To install middleware to check if apis existing or not.
    swaggerExpress.register(app);

    // To install swagger-ui for user to browser.
    app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerDocument));
  });

  return app;
}
