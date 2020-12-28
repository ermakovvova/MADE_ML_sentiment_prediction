from dao import TwitDao
from dto.twit import Twit, ScoredTwit, PagedResult
from services.model import ModelService


class TwitService:
    def __init__(self, twit_dao: TwitDao, model_service: ModelService):
        self._dao = twit_dao
        self._model_service = model_service

    def score(self, twit: Twit) -> ScoredTwit:
        scores = self._model_service.score(twit)
        return ScoredTwit(twit, scores)

    def get_twits(self, page, limit=20) -> PagedResult:
        twits = self._dao.get_twits(page, limit)
        count_twits = self._dao.count()
        return PagedResult(list(map(self.score, twits)), count_twits, page, limit)
