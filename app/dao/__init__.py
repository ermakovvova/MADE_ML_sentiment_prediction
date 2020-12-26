from typing import Iterable

from dto.twit import Twit


def serialize(twit):
    return Twit(twit['id'], twit['date'], twit['name'], twit['text'])


class TwitDao:
    def __init__(self, database):
        self._database = database
        self._collection = self._database.twits

    def get_twits(self, page: int, limit: int) -> Iterable[Twit]:
        res = self._collection.find().sort('date', -1).skip(page * limit).limit(limit)

        return map(serialize, res)

    def count(self) -> int:
        return self._collection.count()
