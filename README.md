# TaskTracker
TaskTracker is a personal project to help develop my backend skills. It can be used to track time on tasks: an example use case could be a software developer tracking time spent on everything they do at work to gain insight into how their day aligns with priorities. At the end of the week, they might be able to see that they spent 10 hours in meetings and 6 hours addressing P1 bugs etc.
TaskTracker is mainly a REST API with a frontend to come, currently the application has the following attributes:
* User registration and login API service
* Task create/start/stop API service
* Authentication using JWT private and public keys
* Backed by mongodb
* Developed using typescript nodejs and expressjs
* Mocha and Chai basic API tests
* Teamcity CI
* AWS hosting
* Docker compose for local deployment

## Three services
* Auth login and registraion
* Task tracking 
* React frontend

## API examples
```bash
curl 
```

# Local Deployment

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
