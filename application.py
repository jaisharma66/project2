import os

from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

# list of all channels
channel_list = ['general']
messages = []
channel_list_msg = {'general': None}

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("current messaging")
def load_curr_msg(data):
    passed_data = {"data": data, "channel_list_msg": channel_list_msg}
    emit("current messaging returned", passed_data, broadcast=True)

@socketio.on("connection validated")
def connection_valid():
    loaded_channels = list(channel_list_msg.keys())
    print(loaded_channels)
    emit('channels_lists', loaded_channels, broadcast=True)

@socketio.on("submit message")
def submit(data):
    print(data, "this is the data")
    selection = data
    channel_list_msg[data["curr_channel"]] = data["set_msg"]
    emit("message_sent", data, broadcast=True)

@socketio.on("channel added")
def added(data):
    print(data, "this is the data r2")
    for i in range(len(channel_list)):
        if data == channel_list[i]:
            return;
    channel_list_msg[data] = None
    new_channel = data
    emit("created new channel", new_channel, broadcast=True)

