from dataclasses import dataclass
from typing import Dict

from dto.model import ModelResult


@dataclass
class Twit:
    id: int
    date: str
    author: str
    text: str


@dataclass
class ScoredTwit:
    twit: Twit
    model_results: Dict[str, ModelResult]
