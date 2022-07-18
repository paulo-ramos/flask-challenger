import pytest
from todo.app import create_app

@pytest.fixture(scope="module")
def app():
    """Instance of Main flask app"""
    return create_app()
