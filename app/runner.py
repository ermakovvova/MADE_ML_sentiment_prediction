import os
from enum import Enum

from flask import Flask

import resources
from containers import Container


class Env(Enum):
    PROD = 'prod'
    DEV = 'dev'
    LOCAL = 'local'


def create_app(env: Env) -> Flask:
    container = Container()
    container.config.from_yaml(f'config.{env.value}.yml')
    if env == Env.PROD:
        container.config.mongo.username.from_env('MONGO_USER')
        container.config.mongo.password.from_env('MONGO_PASS')
    container.wire(modules=resources.all_resources)

    app = Flask(__name__)
    app.container = container
    app.add_url_rule('/api/twits', 'twits', resources.twits.get_tweets_page)
    app.add_url_rule('/api/models', 'models', resources.models.get_models_page)

    return app


if __name__ == '__main__':
    env = Env(os.environ.get('MODE', 'local'))
    app = create_app(env)
    is_dev = env in (Env.DEV, Env.LOCAL)
    if is_dev:
        from flask_cors import CORS

        CORS(app)
    app.run('0.0.0.0', 8080, debug=is_dev)
