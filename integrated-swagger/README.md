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
