from function_factory import FunctionFactory
import io
from collections import namedtuple
from flask.helpers import send_file
from flask import jsonify
import controllers.image

from flask import Flask, request
app = Flask(__name__)

import logging
logging.basicConfig(level=logging.DEBUG)

FunctionFactory.init()

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/createImage', methods=['POST'])
def create_image():
    return str(controllers.image.post_create_image(request.get_json(force=True)))
    '''
    buffer = io.BytesIO(bytes)
    buffer.seek(0)
    return send_file(buffer, attachment_filename='image.jpg', mimetype='image/jpeg')
    '''

@app.route('/image/<line_id>', methods=['GET'])
def get_image(line_id: str):
    bytes = controllers.image.get_image(int(line_id))
    buffer = io.BytesIO(bytes)
    buffer.seek(0)
    return send_file(buffer, attachment_filename='image.jpg', mimetype='image/jpeg')

@app.route('/function/', methods=['GET'])
def get_functions():
    return jsonify({'functions': FunctionFactory.get_all_function_names()})