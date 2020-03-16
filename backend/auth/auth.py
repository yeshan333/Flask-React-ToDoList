'''
@Author: yeshan333
@Date: 2020-03-16 08:57:51
@GitHub: https://github.com/yeshan333
@Contact: yeshan1329441308@gmail.com
@License:
@LastEditTime: 2020-03-16 09:11:23
@Description:
'''

from functools import wraps

from pymongo import MongoClient

from flask import g, current_app, request, abort
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired

from auth.errors import invalid_token, token_missing

def generate_token(user):
    expiration = 3600
    s = Serializer(current_app.config['SECRET_KEY'], expires_in=expiration)
    token = s.dumps({'id': user._id}).decode('ascii')
    return token, expiration


def validate_token(token):
    s = Serializer(current_app.config['SECRET_KEY'])
    try:
        data = s.loads(token)
    except (BadSignature, SignatureExpired):
        return False

    user = []
    connection = MongoClient("mongodb://localhost:27017/")
    db_users = connection.heroku_4tj98rgp.users
    # user = User.query.get(data['id'])  # find User in database
    for row in db_users.find():
        if row['_id'] == data['_id']:
            user.append(row)
            break
    if user is None:
        return False
    g.current_user = user
    return True


def get_token():
    # Flask/Werkzeug do not recognize any authentication types
    # other than Basic or Digest, so here we parse the header by hand.
    if 'Authorization' in request.headers:
        try:
            token_type, token = request.headers['Authorization'].split(None, 1)
        except ValueError:
            # The Authorization header is either empty or has no token
            token_type = token = None
    else:
        token_type = token = None

    return token_type, token


def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token_type, token = get_token()

        # Flask normally handles OPTIONS requests on its own, but in the
        # case it is configured to forward those to the application, we
        # need to ignore authentication headers and let the request through
        # to avoid unwanted interactions with CORS.
        if request.method != 'OPTIONS':
            if token_type is None or token_type.lower() != 'bearer':
                return abort(400, 'The token type must be bearer.')
            if token is None:
                return token_missing()
            if not validate_token(token):
                return invalid_token()
        return f(*args, **kwargs)

    return decorated