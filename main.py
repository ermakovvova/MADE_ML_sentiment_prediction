import joblib


MODEL_FILEPATH = 'model_dump.pkl'
TEST_DATA_FILEPATH = 'test_data.txt'


def load_data(test_data_filepath):
    with open(test_data_filepath) as fin:
        data = []
        for line in fin:
            data.append(line.strip())
    return data


class Classifier(object):
    def __init__(self, model):
        self.model = model

    @classmethod
    def load_model(cls, model_filepath):
        with open(model_filepath, 'rb') as fin:
            model = joblib.load(fin)
        return cls(model)

    def predict_proba(self, data):
        predictions = self.model.predict_proba(data)
        proba_1 = [proba_1 for proba_0, proba_1 in predictions]
        return proba_1


def main():
    model = Classifier.load_model(MODEL_FILEPATH)
    data = load_data(TEST_DATA_FILEPATH)
    predictions = model.predict_proba(data)
    for ans in zip(data, predictions):
        print(ans)


if __name__ == '__main__':
    main()


