## Run tests
Make sure the priv_key.pem file is in this directory and passed through with the volume and make sure to set the path
```bash
docker build . -f test/Dockerfile -t auth_server_test
docker run -e JWT_SECRET_PATH=priv_key.pem -v ${PWD}:/node-app/ -w /node-app/ --rm auth_server_test /bin/bash -c  "mongod --fork --logpath /var/log/mongodb.log && npm install && npm run tsc && npm run test"
```

Fomatting
```
npx prettier -c --single-quote --arrow-parens=always  **/*.ts
```