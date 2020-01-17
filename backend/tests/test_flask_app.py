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
        self.assertEqual(result.status_code, 200)

    # GET a item
    def test_item_get(self):
        result = self.app.get('/api/v1/items/5e218565f532f9e89d89e670')
        self.assertEqual(result.status_code, 200)

    # POST a item
    def test_item_post(self):
        result = self.app.post('/api/v1/items', \
            data='{"value": "yeshan333", "isEditing": "false", "isDone": "false"}', \
            content_type='application/json')
        self.assertEqual(result.status_code, 201)

    # PUT a item, update
    def test_item_put(self):
        result = self.app.put('/api/v1/items', \
            data='{"_id": "5e2186b8e5cd5ba757d35040", "value": "yeshan333", "isEditing": "true", "isDone": "true"}', \
            content_type='application/json')
        self.assertEqual(result.status_code, 200)

    # DELETE, delete a item
    def test_item_delete(self):
        result = self.app.delete('/api/v1/items', \
            data='{"_id": "5e2190510350a224ce1d1c56"}', \
            content_type='application/json')
        self.assertEqual(result.status_code, 200)

