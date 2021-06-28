import cv2
import numpy as np

class BaseFunction():
    def __init__(self) -> None:
        self.name = "base"
        self.is_visible = False
    
    def run(self, img: np.ndarray) -> np.ndarray:
        raise NotImplementedError()