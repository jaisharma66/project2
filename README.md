# Project 2

Web Programming with Python and JavaScript

Hello! Welcome to my third project for the web programming course. This document is going to give a short overview of what each file does,
and how the program works together. I heavily relied on documentation, help from tutoring, and my tf, David Nunez to get through some of the problems.
Certain parts of this program do not work perfectly; I will attempt to describe what the problems are and potential fixes that I was not able
to implement due to time constraints. As previously, I used many sources, so I will just list a few below.
https://stackoverflow.com/questions/1990802/in-python-what-does-dict-popa-b-mean
https://docs.python.org/3.6/library/collections.html#collections.deque
https://www.w3schools.com/js/js_comparisons.asp
https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
https://stackoverflow.com/questions/11448949/how-to-count-the-number-of-values-associated-with-a-key
http://python-reference.readthedocs.io/en/latest/docs/operators/greater_eq.html
https://stackoverflow.com/questions/5844672/delete-an-element-from-a-dictionary
https://stackoverflow.com/questions/268272/getting-key-with-maximum-value-in-dictionary
https://docs.python.org/3/tutorial/datastructures.html
https://www.w3schools.com/jsref/jsref_parseint.asp
https://stackoverflow.com/questions/18795028/javascript-remove-li-without-removing-ul
https://stackoverflow.com/questions/20632401/how-to-send-two-variables-in-one-message-using-socket-io
https://stackoverflow.com/questions/3301688/how-do-you-get-the-currently-selected-option-in-a-select-via-javascript
https://stackoverflow.com/questions/15987140/how-to-check-if-an-item-is-selected-from-an-html-drop-down-list
https://stackoverflow.com/questions/3364493/how-do-i-clear-all-options-in-a-dropdown-box
https://developmentality.wordpress.com/2012/03/30/three-ways-of-creating-dictionaries-in-python/
https://stackoverflow.com/questions/4123603/python-unsubscriptable
https://developmentality.wordpress.com/2012/03/30/three-ways-of-creating-dictionaries-in-python/
https://stackoverflow.com/questions/18224727/count-the-number-of-displayed-elements-in-a-html-list
https://www.w3schools.com/js/js_errors.asp
https://stackoverflow.com/questions/914715/how-to-loop-through-all-but-the-last-item-of-a-list
https://stackoverflow.com/questions/2212433/counting-the-number-of-keywords-in-a-dictionary-in-python
https://btmiller.com/2015/04/13/get-list-of-keys-from-dictionary-in-python-2-and-3.html

Index.js:
For my Milestone 3 personal touch, I added a counter that shows the amount of messages that the user has sent. This was done completely
client side using local storage.

disp_name():
Display name gets the name from the HTML and adds it to the local storage to be retrieved as needed.

retrieved_name():
Retrieves user name from the local storage and shows it in the displayname on the HTML side

"connect":

button.onclick:
When message is submitted, passes all the data to application.py to be processed

button_2.onclick:
Emits to create a new channel for the user

item.onchange:
Checks to see if the select box is changed, and reloads the messages as needed based on the chnanel.


socket.on:

current messaging returned:
This runs when the channel is changed, and removes all of the messages that are on the screen and then readds new messages as retrieved from
the application.py. The catches make sure that all items are removed and new items added correctly.

channel_lists:
works similarly to the above socket where it removes all of the items and readds them when a new channel is added.

message_sent:
The first portion is my personal touch of counting the total number of messsages that the individual user has sent based on their local storage.
This bottom part of the if statement adds the new message to the list and also passes it back to the application.py to be added to a new dicitionary.

created new channel:
appends the new channel

def index():
renders the tempalte

def load curr msg:
passes back data to be updated as it submitted

def connection_valid():
checks the connection and passes back the keys that are the channels as the loaded channels.

def submit(data):
Submits the message to the correct data structure under the channel. Channel : message. Once the message has been added, it is rebroadcasted
so that it can be recieved by all users.

def added(data):
adds a new channel, unless it already exists within the function.

