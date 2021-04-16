```bash
# development env
.\mongod.exe --config .\mongod.conf # start mongodb service

nose2 # start test

# production env
heroku run flask create-database-penv # initial cloud mongo database

heroku config:set MONGO_DB_URI=mongodb+srv://yeshan333:<password>@cluster0.f7c8d.mongodb.net/admin --app=flask-react-todo
```

https://devcenter.heroku.com/articles/config-vars#managing-config-vars