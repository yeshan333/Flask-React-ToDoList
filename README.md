
## Local Debug

```shell
# development env
.\mongod.exe --config .\mongod.conf # start mongodb service
```

## Deploy to Heroku

```shell
# start unit tests
nose2

# production init MongoDB database（MongoDB Atlas free）
heroku run flask create-database

# setting heroku app config vars
heroku config:set MONGO_DB_URI=mongodb+srv://yeshan333:<password>@domain.com/admin --app=flask-react-todo
```

## refs

- [setup-robo3t-with-atlas-a-step-by-step-guide-2hoc](https://dev.to/icesofty/setup-robo3t-with-atlas-a-step-by-step-guide-2hoc)
- [Heroku-managing-config-vars](https://devcenter.heroku.com/articles/config-vars#managing-config-vars)