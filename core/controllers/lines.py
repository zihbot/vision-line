from api import models
from flask.globals import request
from api.models.line import Line
import io
from flask.helpers import send_file
from flask.json import jsonify
from controllers import image
from flask import Blueprint

lines_blueprint = Blueprint('lines', __name__)

@lines_blueprint.route('', methods=['GET'])
def get_line():
    return jsonify([l.to_dict() for l in image.lines_to_model()])

@lines_blueprint.route('', methods=['POST'])
def post_line():
    new_line = image.add_line(Line.from_dict(request.get_json(True)))
    return jsonify(new_line.to_dict())

@lines_blueprint.route('<line_id>/nodes', methods=['GET'])
def get_line_nodes(line_id: str):
    return jsonify([n.to_dict() for n in image.nodes_to_model(int(line_id))])

@lines_blueprint.route('<line_id>/nodes', methods=['POST'])
def post_line_nodes(line_id: str):
    image.add_node(int(line_id), models.Node.from_dict(request.get_json()))
    return jsonify([n.to_dict() for n in image.nodes_to_model(int(line_id))])

@lines_blueprint.route('<line_id>/nodes/<node_id>', methods=['PUT'])
def put_line_node(line_id: str, node_id: str):
    image.put_node(int(line_id), int(node_id), models.Node.from_dict(request.get_json()))
    return jsonify([n.to_dict() for n in image.nodes_to_model(int(line_id))])

@lines_blueprint.route('<line_id>/nodes/<node_id>', methods=['DELETE'])
def delete_line_node(line_id: str, node_id: str):
    image.delete_node(int(line_id), int(node_id))
    return jsonify([n.to_dict() for n in image.nodes_to_model(int(line_id))])