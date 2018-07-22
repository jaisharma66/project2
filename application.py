import os

from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

# list of all channels

messages = []

@app.route("/")
def index():
    return render_template("index.html", messages=messages)

@socketio.on("submit message")
def submit(data):
    print(data, "this is the data")
    selection = data
    messages.append(selection)
    emit("message_sent", data, broadcast=True)
