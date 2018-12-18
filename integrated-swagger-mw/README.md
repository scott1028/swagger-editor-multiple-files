### Ceveat!!

- This project is based off of on `./integrated-swagger` project, I just add `swagger-ui-express` and `swagger-express-mw` for support this.
- Start to develop your backend express app using src/backend/app.js as a entrypoint.

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

##### src/fake/config.js

- Your fake data server is here.

##### src/fixtures/**

- Your fixtures for fake data server.

#### src/yaml/**

- Your swagger yaml file is here.

### Reference

- Swagger Editor, we used from `node_modules/swagger-editor`
- Swagger UI, we used from `public/**` created by `swagger-ui` of npm package and copy the `dist` folder to `public` here
