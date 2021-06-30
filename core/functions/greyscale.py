from os import name
import cv2
import numpy as np
from .base_function import BaseFunction
import yaml

class Greyscale(BaseFunction):
    def __init__(self) -> None:
        super().__init__()
        self.data = yaml.load(open('../functions/greyscale.yaml'))
        self.name = self.data['name']
        #self.data['run'] = 'global img\n' + self.data['run']

    def run(self, img_loc: np.ndarray) -> np.ndarray:
        print(self.data['run'])
        global img
        img = img_loc
        exec(self.data['run'], globals(), globals())
        return img