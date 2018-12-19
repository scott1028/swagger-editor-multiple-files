### Introduce

- This is a project scaffold using swagger driven style to develop backend api.

### Project Structure

##### src/

##### src/backend/config.js

- Your api server is here.

##### src/fixtures/**

- Your fixtures for fake data server.

#### src/yaml/**

- Your swagger yaml file is here.

### dotenv

- Configure target environment

```
# .env
MODE=production
```

```
# .env
MODE=development
```

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

### Troubleshooting

- This project just integrates webpack with gulp.
- Notice! `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p` for resolution when gulp throw ENOSPC error.

### What's following package for?

- `swagger-express-mw`: providing swagger.yaml to check api existing or not such as response no implemented message to client.
- `swagger-ui-express`: providing swagger-ui for user to browse the api-doc online.
- `js-yaml`: for loading swagger.yaml as loading swagger.json file.

### Reference

- Swagger Editor, we used from `node_modules/swagger-editor`
- Swagger UI, we used from `public/**` created by `swagger-ui` of npm package and copy the `dist` folder to `public` here
