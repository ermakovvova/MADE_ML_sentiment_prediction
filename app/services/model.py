import abc

from dto.model import ModelResult
from dto.twit import Twit


class Model:
    def __init__(self, name):
        self.name = name

    @abc.abstractmethod
    def score(self, twit: Twit) -> ModelResult:
        pass


class NaiveModel(Model):
    def __init__(self):
        super().__init__('naive')

    def score(self, twit: Twit) -> ModelResult:
        return ModelResult(0.5, True)
