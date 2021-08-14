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
def get_line_to_node():
    new_line = image.add_line(Line.from_dict(request.get_json(True)))
    return jsonify(new_line.to_dict())