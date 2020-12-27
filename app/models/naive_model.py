import os
import pathlib

from dto.model import ModelResult
from dto.twit import Twit
from models import Model

import joblib

MODEL_FILEPATH = pathlib.Path(__file__).parent.joinpath('dumps', 'model_dump.pkl')


def load_data(test_data_filepath):
    with open(test_data_filepath) as fin:
        data = []
        for line in fin:
            data.append(line.strip())
    return data


class NaiveModel(Model):
    def __init__(self):
        super().__init__('naive', 0.5)
        with open(MODEL_FILEPATH, 'rb') as fin:
            self._model = joblib.load(fin)

    def score(self, twit: Twit) -> ModelResult:
        pred = self._model.predict_proba([twit.text])
        pred = float(pred[0][1])
        return ModelResult(pred, pred > self.threshold)
