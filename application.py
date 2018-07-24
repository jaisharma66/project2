# Imports
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

# Main app route rendering index template
@app.route("/")
def index():
    return render_template("index.html")

# Socket connection that passed back data to retrieve messages from correct channel
@socketio.on("current messaging")
def load_curr_msg(data):
    passed_data = {"data": data, "channel_list_msg": channel_list_msg}
    emit("current messaging returned", passed_data, broadcast=True)

# Gets all channels in dictionary and passes back
@socketio.on("connection validated")
def connection_valid():
    loaded_channels = list(channel_list_msg.keys())
    emit('channels_lists', loaded_channels, broadcast=True)

# Submits a message and adds it to the correct key (channel)
@socketio.on("submit message")
def submit(data):
    selection = data
    channel_list_msg[data["curr_channel"]] = data["set_msg"]
    emit("message_sent", data, broadcast=True)

# Adds the new channel as long as it doesn't already exist and emits it as created
@socketio.on("channel added")
def added(data):
    listed = list(channel_list_msg.keys())
    for i in range(len(channel_list_msg.keys())):
        if data == listed[i]:
            return;
    channel_list_msg[data] = None
    new_channel = data
    emit("created new channel", new_channel, broadcast=True)

