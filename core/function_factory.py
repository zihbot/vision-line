from api import models
import os
from typing import ClassVar
from functions import *

import logging
logger = logging.getLogger(__name__)

class FunctionFactory():
    all_functions: list[BaseFunction] = []

    @classmethod
    def init(cls) -> None:
        logger.debug('START FunctionFactory')
        for file in os.listdir('../functions/'):
            cls.all_functions.append(BaseFunction(file.split('.')[0]))

    @classmethod
    def get_all_function_names(cls) -> list[str]:
        return [f.name for f in cls.all_functions]

    @classmethod
    def get_all_function_inputs(cls) -> list[any]:
        result = []
        for funct in cls.all_functions:
            item = {
                'name': funct.name,
                'inputs': funct.valid_inputs
            }
            result.append(item)
        return result

    @classmethod
    def to_list(cls) -> list[models.Function]:
        result: list[models.Function] = []
        for funct in cls.all_functions:

            inputs: list[models.FunctionInput] = []
            for input in funct.valid_inputs:
                iname, ival = next(iter(input.items()))
                inputs.append(models.FunctionInput(
                    name=iname,
                    display=ival.get('display', iname),
                    type=ival.get('type', 'string'),
                    values=ival.get('values', None),
                    regex=ival.get('regex', None)
                ))

            item = models.Function(
                name=funct.name,
                display=funct.name,
                inputs=inputs
            )
            result.append(item)
        return result

    @classmethod
    def get_function(cls, name: str) -> BaseFunction:
        for function in cls.all_functions:
            if function.name == name:
                return function
