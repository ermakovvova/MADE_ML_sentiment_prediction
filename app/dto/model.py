from dataclasses import dataclass


@dataclass
class ModelResult:
    score: float
    is_positive: bool
