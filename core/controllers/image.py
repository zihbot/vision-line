from collections import namedtuple
import os
import cv2
from flask import stream_with_context, request
import logging
from function_factory import FunctionFactory
from api import models
import time

logger = logging.getLogger(__name__)

_Line=namedtuple('_Line', 'name last_change nodes')
lines: list[_Line] = [_Line(name='asd', last_change=1413534, nodes=[])]

def post_create_image_bck(data: list[dict]) -> bytes:
    img = cv2.imread('img.jpg')
    print(type(img))
    is_success, buffer_array = cv2.imencode('.jpg', img)
    return buffer_array.tobytes()
    
def post_create_image(data: list[dict]) -> int:
    logger.debug('post_create_image data=%s', data)
    l = _Line(name='xxx', last_change=0, nodes=data)
    lines.append(l)
    return len(lines) - 1
    
def create_image_add(line_id: int, position: int, data: dict) -> int:
    logger.debug('patch_create_image data=%s', data)
    lines[line_id].nodes.insert(position, data)
    return True
    
def create_image_edit(line_id: int, position: int, data: dict) -> int:
    logger.debug('create_image_edit data=%s', data)
    lines[line_id].nodes[position] = data
    return True
    
def create_image_reorder(line_id: int, data: list[int]) -> int:
    logger.debug('create_image_reorder data=%s', data)
    if len(data) != len(lines[line_id]):
        return False
    lines[line_id].nodes = [lines[line_id][i] for i in data]
    return True
    
def create_image_delete(line_id: int, position: int) -> int:
    logger.debug('patch_create_image line_id=%s, position=%s', line_id, position)
    lines[line_id].nodes.pop(position)
    return True

def get_image(line_id: int, last_node_id: int = None) -> bytes:
    logger.debug('get_image id=%s last_node=%s data=%s', line_id, last_node_id, lines[line_id])
    use_nodes = lines[line_id].nodes
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
    return lines[line_id].nodes

def get_lines_node_numbers() -> list[dict]:
    return [len(line.nodes) for line in lines]

def lines_to_model() -> list[models.Line]:
    result: list[models.Line] = []
    for i, line in enumerate(lines):
        result.append(models.Line(
            id=i,
            name=line.name,
            nodes=len(line.nodes),
            last_change=line.last_change
        ))
    return result

def time_ms() -> int:
    return time.time_ns() // (1000*1000)

def add_line(line: models.Line) -> models.Line:
    line.id = len(lines)
    line.last_change = time_ms()
    line.nodes = 0 if line.nodes is None else line.nodes
    line.name = '' if line.name is None else line.name

    l = _Line(line.name, line.last_change, [])
    lines.append(l)
    return line

def nodes_to_model(line_id: int) -> list[models.Node]:
    result: list[models.Node] = []
    for i, node in enumerate(lines[line_id].nodes):
        result.append(models.Node(
            id=i,
            position=i,
            name=node['name'],
            inputs=node['inputs']
        ))
    return result

def add_node(line_id: int, node: models.Node) -> None:
    l = lines[line_id]
    l._replace(last_change=time_ms())

    nodes: list = l.nodes
    n = {'name': node.name, 'inputs': node.inputs}
    nodes.insert(node.position, n)

    l._replace(nodes=nodes)
    lines[line_id] = l

def put_node(line_id: int, node_id: int, node: models.Node) -> None:
    l = lines[line_id]
    l._replace(last_change=time_ms())

    nodes: list = l.nodes
    nodes.pop(node_id)
    n = {'name': node.name, 'inputs': node.inputs}
    nodes.insert(node.position, n)

    l._replace(nodes=nodes)
    lines[line_id] = l

def delete_node(line_id: int, node_id: int) -> None:
    l = lines[line_id]
    l._replace(last_change=time_ms())

    nodes: list = l.nodes
    nodes.pop(node_id)
    
    l._replace(nodes=nodes)
    lines[line_id] = l
