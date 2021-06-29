from functions import *

class FunctionFactory():
    @classmethod
    def get_function(cls, name: str) -> BaseFunction:
        if name == 'greyscale':
            return Greyscale()
