import os
from typing import ClassVar
from functions import *

class FunctionFactory():
    all_functions: list[BaseFunction] = []

    @classmethod
    def init(cls) -> None:
        for file in os.listdir('../functions/'):
            cls.all_functions.append(BaseFunction(file.split('.')[0]))

    @classmethod
    def get_all_function_names(cls) -> list[str]:
        return [f.name for f in cls.all_functions]

    @classmethod
    def get_function(cls, name: str) -> BaseFunction:
        for function in cls.all_functions:
            if function.name == name:
                return function
