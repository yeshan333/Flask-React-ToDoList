import sys
import click

from flask import Flask
from flask import jsonify, make_response, abort, request
from flask_cors import CORS

from pymongo import MongoClient
from time import strftime, gmtime


app = Flask(__name__)

CORS(app)

# CROSS-ORIGIN-RESOURCE-SHARING
cors = CORS(app, resources={r"/api/*": {"origin": "*"}})

# ------------------------------------------------------------------
# Database MongoDB
connection = MongoClient("mongodb://localhost:27017/")

@app.cli.command("create-database",  help='initial DataBase')
def create_database():
    try:
        dbnames = connection.list_database_names()
        if 'flask_react_todo' not in dbnames:
            db_api = connection.flask_react_todo.apirelease
            db_items = connection.flask_react_todo.items

            db_api.insert_one({
                "version": "v1",
                "buildtime": strftime('%A, %d %b %Y %H:%M:%S', gmtime()),
                "methods": "GET, POST, PUT, DELETE",
                "link": "api/v1/items"
            })

            db_items.insert_one({
                "value": "Hello World！",
                "isEditing": True,
                "isDone": False
            })

            # db_items.create_index([("id", 1)], unique=True)

            db_items.insert_one({
                "value": "Hello World！",
                "isEditing": False,
                "isDone": False
            })

            click.echo("Database Initialize completed!")
        else:
            click.echo("Database already Initialized!")
    except:
        click.echo("Unexpected Error:", sys.exc_info()[0])
        click.echo("Database Creation Failed!")

@app.cli.command("drop-database", help="drop DataBase")
@click.argument("db_name")
def drop_database(db_name):
    try:
        connection.drop_database(db_name)
        click.echo("Drop Database " + db_name + " Successful!")
    except:
        click.echo("Unexpected Error:", sys.exc_info()[0])
        click.echo("Database Drop Failed!")

# ------------------------------------------------------------------
# GET /api/v1/info
@app.route('/api/v1/info', methods=['GET'])
def get_api_info():
    db = connection.flask_react_todo.apirelease
    print("Open Database Sucessful!")
    api_list = []

    for row in db.find():
        row['_id'] = str(row['_id'])
        api_list.append(row)
    if api_list == []:
        abort(404)
    return jsonify({"api_info": api_list}), 200

# GET item list
@app.route('/api/v1/items', methods=['GET'])
def get_items():
    db = connection.flask_react_todo.items
    print('Open Database Sucessful!')
    items_list = []
    for row in db.find():
        row['_id'] = str(row['_id'])
        items_list.append(row)
    if items_list == []:
        abort(404)
    return jsonify({"items_list": items_list}), 200

# GET a item
@app.route('/api/v1/items/<string:item_id>', methods=['GET'])
def get_item(item_id):
    db = connection.flask_react_todo.items
    print('Open Database Successful!')
    item_list = []
    for row in db.find():
        row['_id'] = str(row['_id'])
        if row['_id'] == item_id:
            item_list.append(row)
    if item_list == []:
        abort(404)
    return jsonify({"item_list": item_list}), 200

# POST a item
@app.route('/api/v1/items', methods=['POST'])
def post_item():
    print(request.json)
    if not request.json or not 'value' in request.json or \
        not 'isEditing' in request.json or not 'isDone' in request.json:
        abort(400)

    isEditing = True if request.json['isEditing'] == 'true' else False
    isDone = True if request.json['isDone'] == 'true' else False
    item = {
        'value': request.json['value'],
        'isEditing': isEditing,
        'isDone': isDone
    }

    return jsonify({"status": add_item(item)}), 201

def add_item(item):
    db = connection.flask_react_todo.items
    print('Open Database Successful!')
    print(item)

    db.insert_one(item)
    return "Sucess"

# PUT, update a item
@app.route('/api/v1/items', methods=['PUT'])
def update_item():
    if not request.json or not '_id' in request.json or not 'value' in request.json or \
        not 'isEditing' in request.json or not 'isDone' in request.json:
        abort(400)
    item = {}
    key_list = request.json.keys()
    for i in key_list:
        item[i] = request.json[i]
    return jsonify({"status": upd_item(item)})

def upd_item(item):
    db = connection.flask_react_todo.items
    print('Open Database Successful!')
    # print(item)
    item_list = []
    for row in db.find():
        if str(row['_id']) == item['_id']:
            item_list.append(row)
    if item_list == []:
        abort(409)
    else:
        del item['_id']
        for i in item_list:
            db.update({"_id": i["_id"]}, {'$set': item})
            return "Success"

# DELETE, delete a item
@app.route('/api/v1/items', methods=['DELETE'])
def delete_item():
    if not request.json or not '_id' in request.json:
        abort(400)
    item ={}
    item['_id'] = request.json['_id']
    return jsonify({"status": del_item(item)}), 200

def del_item(item):
    db = connection.flask_react_todo.items
    print('Open Database Successful!')
    item_list = []
    for row in db.find():
        if str(row['_id']) == item['_id']:
            item_list.append(row)
    if item_list == []:
        abort(409)
    else:
        for i in item_list:
            db.remove({"_id": i["_id"]})
            return "Success"

# ------------------------------------------------------------------
# bad request handle
@app.errorhandler(400)
def invalid_request(error):
    return make_response(jsonify({'error': 'Bad Request'}), 400)

@app.errorhandler(404)
def resource_not_found(error):
    return make_response({'error':'Resource Not Found!'}, 404)

@app.errorhandler(409)
def resource_conflict(error):
    return make_response({'error':'Resource Conflict'}, 409)




