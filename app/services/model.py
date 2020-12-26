from typing import Iterable, Dict

from dto.model import ModelResult
from dto.twit import Twit
from models import Model


class ModelService:
    def __init__(self, models: Iterable[Model]):
        self._models = models

    def score(self, twit: Twit) -> Dict[str, ModelResult]:
        return {
            model.name: model.score(twit)
            for model in self._models
        }

    def get_models(self):
        return {model.name: model.threshold for model in self._models}
