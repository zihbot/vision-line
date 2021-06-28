from models.image_dto import PostCreateImageInElem
import cv2
from flask import stream_with_context, request

def post_create_image(data: list[PostCreateImageInElem]) -> bytes:
    img = cv2.imread('img.jpg')
    is_success, buffer_array = cv2.imencode('.jpg', img)
    return buffer_array.tobytes()
