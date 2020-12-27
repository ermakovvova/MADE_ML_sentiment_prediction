import pathlib
import joblib
import json

from keras.preprocessing.sequence import pad_sequences
from keras.models import model_from_json


from dto.model import ModelResult
from dto.twit import Twit
from models import Model


MODEL_CONFIG_FILEPATH = pathlib.Path(__file__).parent.joinpath('dumps', 'cnn_model.json')
MODEL_WEIGHTS_FILEPATH = pathlib.Path(__file__).parent.joinpath('dumps', 'cnn_model_weights')
TOKENIZER_FILEPATH = pathlib.Path(__file__).parent.joinpath('dumps', 'tokenizer_dump.pkl')
SENTENCE_LENGTH = 26  # received empirically in Habr.com paper


def get_sequences(tokenizer, x):
    sequences = tokenizer.texts_to_sequences(x)
    return pad_sequences(sequences, maxlen=SENTENCE_LENGTH)


class CnnModel(Model):
    def __init__(self):
        super().__init__('cnn', 0.5)
        with open(MODEL_CONFIG_FILEPATH, 'r') as fin:
            json_config_loaded = json.load(fin)
        self._model = model_from_json(json_config_loaded)
        self._model.load_weights('MODEL_WEIGHTS_FILEPATH')

        with open('tokenizer.pkl', 'rb') as fin:
            self._tokenizer = joblib.load(fin)

    def score(self, twit: Twit) -> ModelResult:
        text = get_sequences(self._tokenizer, [twit.text])
        pred = self._model.predict_proba(text)
        pred = float(pred[0][0])
        return ModelResult(pred, pred > self.threshold)
