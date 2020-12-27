from dependency_injector.wiring import Provide, inject
from flask import request

from containers import Container
from dto.twit import PagedResult
from services.twit import TwitService


def render_result(twits_page: PagedResult):
    return twits_page.__dict__


@inject
def get_tweets_page(twit_service: TwitService = Provide[Container.twit_service]):
    page = int(request.args.get('page', 0))
    twits = twit_service.get_twits(page)
    return render_result(twits)
