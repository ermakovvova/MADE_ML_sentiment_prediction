from dependency_injector.wiring import Provide, inject

from containers import Container
from dto.twit import PagedResult
from services.model import ModelService


def render_result(twits_page: PagedResult):
    return twits_page.__dict__


@inject
def get_models_page(model_service: ModelService = Provide[Container.model_service]):
    return model_service.get_models()
