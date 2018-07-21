import os

from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

# list of all channels
channel_list = ['general']
messages = []

@app.route("/")
def index():
    return render_template("index.html")

# @app.route("/messages", methods=["POST"])
# def messages():


if __name__ == "__main__":
    index();