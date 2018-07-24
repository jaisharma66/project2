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
    return render_template("index.html", messages=messages)

@socketio.on("current messaging")
def load_curr_msg():
    curr_msg = messages;
    emit("current messaging returned", curr_msg)

@socketio.on("connection validated")
def connection_valid():
    loaded_channels = channel_list
    print(loaded_channels)
    emit('channels_lists', loaded_channels, broadcast=True)

@socketio.on("submit message")
def submit(data):
    print(data, "this is the data")
    selection = data
    messages.append(selection)
    emit("message_sent", data, broadcast=True)

@socketio.on("channel added")
def added(data):
    print(data, "this is the data r2")
    for i in range(len(channel_list)):
        if data == channel_list[i]:
            return;
    channel_list.append(data)
    new_channel = data
    emit("created new channel", new_channel, broadcast=True)