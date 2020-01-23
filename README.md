```bash
# development env
.\mongod.exe --config .\mongod.conf # start mongodb service

nose2 # start test

# production env
heroku run flask create-database-penv # initial cloud mongo database
```