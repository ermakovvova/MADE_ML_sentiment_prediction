from dependency_injector import containers, providers
from pymongo import MongoClient

import dao
import services


def create_db(mongo_client, db):
    return mongo_client[db]


class Container(containers.DeclarativeContainer):
    config = providers.Configuration()

    mongo_client = providers.Singleton(
        MongoClient,
        host=config.mongo.host,
        port=config.mongo.port,
        username=config.mongo.username,
        password=config.mongo.password,
    )
    database = providers.Singleton(
        create_db,
        mongo_client=mongo_client,
        db=config.mongo.db,
    )

    twit_dao = providers.Singleton(
        dao.TwitDao,
        database=database,
    )

    naive_model = providers.Singleton(
        services.model.NaiveModel
    )
    models = [
        naive_model
    ]

    twit_service = providers.Singleton(
        services.twit.TwitService,
        twit_dao=twit_dao,
        models=providers.List(*models),
    )
