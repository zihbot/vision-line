import io
from flask.helpers import send_file
import controllers.image

from flask import Flask, request
app = Flask(__name__)

import logging
logging.basicConfig(level=logging.DEBUG)

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