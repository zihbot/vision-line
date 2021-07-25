import cv2
from flask import stream_with_context, request
import logging
from function_factory import FunctionFactory

logger = logging.getLogger(__name__)
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
    
def create_image_add(line_id: int, position: int, data: dict) -> int:
    logger.debug('patch_create_image data=%s', data)
    lines[line_id].insert(position, data)
    return True
    
def create_image_edit(line_id: int, position: int, data: dict) -> int:
    logger.debug('create_image_edit data=%s', data)
    lines[line_id][position] = data
    return True
    
def create_image_reorder(line_id: int, data: list[int]) -> int:
    logger.debug('create_image_reorder data=%s', data)
    if len(data) != len(lines[line_id]):
        return False
    lines[line_id] = [lines[line_id][i] for i in data]
    return True
    
def create_image_delete(line_id: int, position: int) -> int:
    logger.debug('patch_create_image line_id=%s, position=%s', line_id, position)
    lines[line_id].pop(position)
    return True

def get_image(line_id: int, last_node_id: int = None) -> bytes:
    logger.debug('get_image id=%s last_node=%s data=%s', line_id, last_node_id, lines[line_id])
    use_nodes = lines[line_id]
    if last_node_id is not None:
        use_nodes = use_nodes[:last_node_id]

    img_loc = cv2.imread('images/_default.jpg')

    for node in use_nodes:
        func = FunctionFactory.get_function(node['name'])
        func.set_inputs(node['inputs'] if 'inputs' in node else {})
        img_loc = func.run(img_loc)
    
    is_success, buffer_array = cv2.imencode('.jpg', img_loc)
    return buffer_array.tobytes()

def get_line(line_id: int) -> list[dict]:
    return lines[line_id]

def get_lines_node_numbers() -> list[dict]:
    return [len(line) for line in lines]
