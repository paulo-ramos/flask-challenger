def test_app_is_create(app):
    assert app.name == 'todo.app'

def test_config_is_loaded(config):
    assert config["DEBUG"] is False

def test_request_returns_404(client):
    assert client.get("/url_inexistente").status_code == 404

