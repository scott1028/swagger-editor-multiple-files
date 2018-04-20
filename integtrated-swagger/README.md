### How to run
```sh
$ yarn
$ yarn run build
```
the output file will be dist/swagger, you can then compare it with the original swagger file
```sh
$ yarn run diff
```
and it will tell you that these two files are identical, which proves the POC works


### The idea behind
the idea is to divide the original swagger file into smaller pieces, and reassemble those pieces by going under a build process. Take this POC for example, if you want to add api routes for a new manager (like what we did in R1), you only have to: 

1. add a new file to src/paths/ directory
2. write detailed descriptions (urls, schemas, whatever) in that file
3. include that file in src/swagger.yaml using @@include syntax


### Memo
- nested @@include is not supported
- currently, we only have a single definitions.yaml, but this can also be split just like paths