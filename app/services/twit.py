from typing import Iterable

from dao import TwitDao
from dto.twit import Twit, ScoredTwit
from services.model import Model


class TwitService:
    def __init__(self, twit_dao: TwitDao, models: Iterable[Model]):
        self._dao = twit_dao
        self._models = models

    def score(self, twit: Twit) -> ScoredTwit:
        scores = {}
        for model in self._models:
            scores[model.name] = model.score(twit)
        return ScoredTwit(twit, scores)

    def get_twits(self, page, limit=50) -> Iterable[ScoredTwit]:
        twits = self._dao.get_twits(page, limit)
        return list(map(self.score, twits))
