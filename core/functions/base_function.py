import logging
from os import name, path
from typing import Tuple
import cv2
import numpy as np
import yaml
import hashlib
import requests

logger = logging.getLogger(__name__)

class BaseFunction():
    def __init__(self, path: str) -> None:
        self.data = yaml.load(open('../functions/' + path + '.yaml'), Loader=yaml.FullLoader)
        self.name: str = self.data['name']
        self.valid_inputs: list[dict[str, dict]] = self.data['inputs'] if 'inputs' in self.data else []

    def set_inputs(self, inputs: dict[str, str]):
        # TODO: check validity
        self.inputs = inputs

    def run(self, img_loc: np.ndarray) -> np.ndarray:
        global img
        img = img_loc

        # Set inputs for run
        for name, value in self.inputs.items():
            logger.debug('Inserting variables: ' + name + '=' + value)
            globals()[name] = value

        # Run script
        exec(self.data['run'], globals(), globals())
        return img