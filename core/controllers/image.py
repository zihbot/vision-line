import cv2
from flask import stream_with_context, request
import logging
from function_factory import FunctionFactory

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
lines: list[list[dict]] = []

def post_create_image_bck(data: list[dict]) -> bytes:
    img = cv2.imread('img.jpg')
    print(type(img))
    is_success, buffer_array = cv2.imencode('.jpg', img)
    return buffer_array.tobytes()
    
def post_create_image(data: list[dict]) -> int:
    logger.debug('post_create_image data=%s', data)
    lines.append(data)
    return len(lines) - 1

def get_image(line_id: int) -> bytes:
    logger.debug('get_image id=%s data=%s', line_id, lines[line_id])
    img = cv2.imread('img.jpg')

    for node in lines[line_id]:
        func = FunctionFactory.get_function(node['name'])
        img = func.run(img)
    
    is_success, buffer_array = cv2.imencode('.jpg', img)
    return buffer_array.tobytes()
