from flask import Flask

import resources
from containers import Container


def create_app() -> Flask:
    container = Container()
    container.config.from_yaml('config.yml')
    # container.config.mongo.username.from_env('MONGO_USER')
    # container.config.mongo.password.from_env('MONGO_PASS')
    container.wire(modules=resources.all_resources)

    app = Flask(__name__)
    app.container = container
    app.add_url_rule('/twits', 'twits', resources.twits.get_tweets_page)
    app.add_url_rule('/models', 'models', resources.models.get_models_page)

    return app


if __name__ == '__main__':
    app = create_app()
    from flask_cors import CORS

    CORS(app)
    app.run('0.0.0.0', 8080, debug=True)
