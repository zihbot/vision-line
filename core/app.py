import io
from flask.helpers import send_file
import controllers.image

from flask import Flask, request
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/createImage', methods=['POST'])
def create_image():
    bytes = controllers.image.post_create_image(request.get_json(force=True))
    buffer = io.BytesIO(bytes)
    buffer.seek(0)
    return send_file(buffer, attachment_filename='image.jpg', mimetype='image/jpeg')