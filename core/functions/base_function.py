from os import name
import cv2
import numpy as np
import yaml

class BaseFunction():
    def __init__(self, path: str) -> None:
        self.data = yaml.load(open('../functions/' + path + '.yaml'), Loader=yaml.FullLoader)
        self.name = self.data['name']
    
    def run(self, img_loc: np.ndarray) -> np.ndarray:
        global img
        img = img_loc
        exec(self.data['run'], globals(), globals())
        return img