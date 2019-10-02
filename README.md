# TaskTracker
TaskTracker allows a user to deploy their own task timing web service for local use.
I created this to learn node, express and mongo

## Prerequisites
1. Docker should be installed :whale:

## Usage
1. Deploy using docker
```bash
docker-compose up
```
2. Navigate to "localhost:3000"
3. To stop, run
```bash
docker-compose stop
```

## Development
To update package.json with new dependency
```bash
docker run -v ${PWD}:/node-app/ -w /node-app/ --rm node:8.16-alpine npm install <dependency name> --save
```