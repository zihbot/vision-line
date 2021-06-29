import cv2
import numpy as np
from .base_function import BaseFunction

class Greyscale(BaseFunction):
    def __init__(self) -> None:
        super().__init__()
        self.name = 'greyscale'
        self.is_visible = True

    def run(self, img: np.ndarray) -> np.ndarray:
        return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)