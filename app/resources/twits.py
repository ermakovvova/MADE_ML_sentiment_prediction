from dependency_injector.wiring import Provide, inject
from flask import request

from containers import Container
from services.twit import TwitService


def render_result(tweets, page):
    data = {'page': page, 'twits': tweets}
    return data


@inject
def get_tweets_page(twit_service: TwitService = Provide[Container.twit_service]):
    page = int(request.args.get('page', 0))
    tweets = twit_service.get_twits(page)
    return render_result(tweets, page)
