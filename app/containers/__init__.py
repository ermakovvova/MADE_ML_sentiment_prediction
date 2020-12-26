from dependency_injector import containers, providers
from pymongo import MongoClient

import dao
import models
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
        models.NaiveModel
    )
    models = [
        naive_model,
        providers.Singleton(
            models.TestModel
        )
    ]

    model_service = providers.Singleton(
        services.model.ModelService,
        models=providers.List(*models),
    )

    twit_service = providers.Singleton(
        services.twit.TwitService,
        twit_dao=twit_dao,
        model_service=model_service,
    )
