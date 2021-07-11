from function_factory import FunctionFactory
import io
from collections import namedtuple
from flask.helpers import send_file
from flask import jsonify
from flask_cors import CORS
import controllers.image

from flask import Flask, request, Blueprint
app = Flask(__name__)
cors = CORS(app)

root = Blueprint("root_bp", __name__)

import logging
logging.basicConfig(level=logging.DEBUG)

FunctionFactory.init()

@root.route('/')
def hello_world():
    return 'Hello, World!'

@root.route('/createImage', methods=['POST'])
def create_image():
    return str(controllers.image.post_create_image(request.get_json(force=True)))

@root.route('/createImage/<line_id>/add/<position>', methods=['POST'])
def create_image_add(line_id: str, position: str):
    return 'OK' if controllers.image.create_image_add(int(line_id), int(position), request.get_json(force=True)) else 'ERROR'

@root.route('/createImage/<line_id>/delete/<position>', methods=['DELETE'])
def create_image_delete(line_id: str, position: str):
    return 'OK' if controllers.image.create_image_delete(int(line_id), int(position)) else 'ERROR'

@root.route('/image/<line_id>', methods=['GET'])
def get_image(line_id: str):
    bytes = controllers.image.get_image(int(line_id))
    buffer = io.BytesIO(bytes)
    buffer.seek(0)
    return send_file(buffer, attachment_filename='image.jpg', mimetype='image/jpeg')

@root.route('/line/<line_id>', methods=['GET'])
def get_line(line_id: str):
    return jsonify(controllers.image.get_line(int(line_id)))

@root.route('/function/', methods=['GET'])
def get_functions():
    return jsonify(FunctionFactory.get_all_function_inputs())

app.register_blueprint(root, url_prefix='/api/v1')