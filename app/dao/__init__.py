from dto.twit import Twit


def serialize(twit):
    return Twit(twit['id'], twit['name'], twit['text'], twit['date'])


class TwitDao:
    def __init__(self, database):
        self._database = database
        self._collection = self._database.twits

    def get_twits(self, page, limit):
        res = self._collection.find().sort('date', -1).skip(page * limit).limit(limit)

        return map(serialize, res)
