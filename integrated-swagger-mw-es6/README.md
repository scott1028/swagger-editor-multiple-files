### Ceveat!!

- This project is based off of on `./integrated-swagger` project, I just add `swagger-ui-express` and `swagger-express-mw` for support this.
- Start to develop your backend express app using src/backend/app.js as a entrypoint.
- Add webpack support by following command for saving to devDependencies:

```sh
yarn add webpack webpack-cli --dev
```

1. For Support NodeJS Environment

```
'use strict';

module.exports = {
  // entry: './src/index.js'  // <-- Default
  target: 'node'    <--
};
```

2. Add entrypoint to override webpack configure for excluding node_modules when webpack traspiles your entrypoint.

```
'use strict';

module.exports = {
  entry: {
    app: './src/index.js',   // <-- set it with a chunk name "app"
  },
  target: 'node',
};
```

3. By using `webpack-node-externals` plugin to Add External `node_modules`.

```
'use strict';

const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  target: 'node',
  externals: [nodeExternals()],   // <-- this excludes those `node_modules` packages when webpack is transpiling your source code.
};
```

4. Add `babel` for transpiling esNext to es5, default webpack support to transpile `import` to `require` but not support `cont` to `var`

```
yarn add --dev babel-loader @babel/core @babel/preset-env   <-- Add those package to support webpack
```

```
'use strict';

const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],   // <-- transpile using babel-preset-env default settings, such as convert `const` to `var` so on.
          }
        }
      }
    ]
  },
};
```

5. Add yaml loader for require yaml file as a JavaScript object by `js-yaml-loader` and rename output path

```
yarn add --dev js-yaml-loader   <-- Add those package to support webpack
```

```
'use strict';

const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: {
    dist: './src/backend/app.es6.js',
  },
  output: {
    filename: 'app.[name].js',
    path: path.resolve(__dirname, 'src/backend'),   // <-- This is for setting particular output path with chunk name `dist`.
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }
      },
      {
        test: /\.yaml$/,
        use: 'js-yaml-loader',    // <-- This is for handling import *.yaml file in your entrypoint script.
      }
    ]
  },
};
```

### What's following package for?

- `swagger-express-mw`: providing swagger.yaml to check api existing or not such as response no implemented message to client.
- `swagger-ui-express`: providing swagger-ui for user to browse the api-doc online.
- `js-yaml`: for loading swagger.yaml as loading swagger.json file.

### How to run


- Interactive API Doc

```sh
$ yarn
$ yarn lift
```

- Interactive API Doc Editor

```sh
$ yarn
$ yarn lift:edit
```

### Project Structure

##### src/backend/config.js

- Your api server is here.

##### src/fixtures/**

- Your fixtures for fake data server.

#### src/yaml/**

- Your swagger yaml file is here.

### Reference

- Swagger Editor, we used from `node_modules/swagger-editor`
- Swagger UI, we used from `public/**` created by `swagger-ui` of npm package and copy the `dist` folder to `public` here
