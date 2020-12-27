import abc

from dto.model import ModelResult
from dto.twit import Twit


class Model:
    def __init__(self, name, threshold):
        self.name = name
        self.threshold = threshold

    @abc.abstractmethod
    def score(self, twit: Twit) -> ModelResult:
        pass


class TestModel(Model):
    def __init__(self):
        super().__init__('test', None)

    def score(self, twit: Twit) -> ModelResult:
        return ModelResult(0.5, False)
