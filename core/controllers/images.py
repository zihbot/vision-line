import io
from flask.helpers import send_file
from flask.json import jsonify
from controllers import image
from flask import Blueprint

images_blueprint = Blueprint('images', __name__)

@images_blueprint.route('/<line_id>', methods=['GET'])
def get_line(line_id: str):
    bytes = image.get_image(int(line_id))
    buffer = io.BytesIO(bytes)
    buffer.seek(0)
    return send_file(buffer, attachment_filename='image.jpg', mimetype='image/jpeg')

@images_blueprint.route('/<line_id>/<node_id>', methods=['GET'])
def get_line_to_node(line_id: str, node_id: str):
    bytes = image.get_image(int(line_id), int(node_id))
    buffer = io.BytesIO(bytes)
    buffer.seek(0)
    return send_file(buffer, attachment_filename='image.jpg', mimetype='image/jpeg')