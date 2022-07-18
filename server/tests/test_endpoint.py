import json


def test_request_returns_200_add_new_todo(client):
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    data = {
        'title': 'Teste1'
    }
    url = '/todo/'

    response = client.post(url, data=json.dumps(data), headers=headers)

    assert response.content_type == 'text/html; charset=utf-8'
    assert response.status_code == 200