import unittest

from app import app

class Flask_APP_Test(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

        self.app.testing = True

    # api info
    def test_api_info(self):
        result = self.app.get('/api/v1/info')
        self.assertEqual(result.status_code, 200)

    # GET items
    def test_items_get(self):
        result = self.app.get('/api/v1/items')
        # print("结果", result.json)
        self.assertEqual(result.status_code, 200)

    # GET a item
    def test_item_get(self):
        get_result = self.app.get('/api/v1/items')
        _id = get_result.json['items_list'][0]['_id']
        result = self.app.get('/api/v1/items/' + _id)
        self.assertEqual(result.status_code, 200)

    # POST a item
    def test_item_post(self):
        result = self.app.post('/api/v1/items', \
            data='{"value": "yeshan333", "isEditing": "false", "isDone": "false"}', \
            content_type='application/json')
        self.assertEqual(result.status_code, 201)

    # PUT a item, update
    def test_item_put(self):
        get_result = self.app.get('/api/v1/items')
        id = get_result.json['items_list'][0]['_id']
        post_data = '{"_id": "%s", "value": "yeshan333", "isEditing": "true", "isDone": "true"}' % (str(id))
        result = self.app.put('/api/v1/items', \
            data=post_data, \
            content_type='application/json')
        self.assertEqual(result.status_code, 200)

    # DELETE, delete a item
    def test_item_delete(self):
        get_result = self.app.get('/api/v1/items')
        iid = get_result.json['items_list'][1]['_id']
        post_data = '{"_id": "%s"}' % (iid)
        result = self.app.delete('/api/v1/items', \
            data=post_data, \
            content_type='application/json')
        self.assertEqual(result.status_code, 200)