'''
@Author: yeshan333
@Date: 2020-03-16 09:08:46
@GitHub: https://github.com/yeshan333
@Contact: yeshan1329441308@gmail.com
@License:
@LastEditTime: 2020-03-16 09:10:05
@Description:
'''

from flask import jsonify
from werkzeug.http import HTTP_STATUS_CODES

def api_abort(code, message=None, **kwargs):
    if message is None:
        message = HTTP_STATUS_CODES.get(code, '')

    response = jsonify(code=code, message=message, **kwargs)
    response.status_code = code
    return response  # You can also just return (response, code) tuple

def invalid_token():
    response = api_abort(401, error='invalid_token', error_description='Either the token was expired or invalid.')
    response.headers['WWW-Authenticate'] = 'Bearer'
    return response


def token_missing():
    response = api_abort(401)
    response.headers['WWW-Authenticate'] = 'Bearer'
    return response
