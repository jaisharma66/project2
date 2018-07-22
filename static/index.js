var channel_list = ['general'];
var cur_msg = null;

function disp_name()
{
    let disp_username = document.getElementById("disp_username").value;
    localStorage.setItem('disp_username', disp_username);
}


function set_msg()
{
    cur_msg = document.querySelector('#message_box').value;
}

function retrieved_name()
{
    let showname = localStorage.getItem('disp_username');
    if (!localStorage.getItem('disp_username'))
        document.getElementById("displayname").innerHTML = "Type in Your Name";
    else
        document.getElementById("displayname").innerHTML = "Welcome, " + showname;
}

function add_channel()
{
    var selection = document.getElementById("chn_name");
    var channel_added = document.querySelector('#channel_input').value;
    var option = document.createElement('option');
    for(var i = 0; i < channel_list.length; i++)
    {
        if(channel_added == channel_list[i])
        {
            return(alert("Channel has already been created"));
        }
    }
    channel_list.push(channel_added);
    option.text = channel_added;
    option.value = channel_added;
    selection.add(option);
    selection.insertAdjacentHTML('beforeEND', selection.join('\n'));
}

function input_val()
{
    return cur_msg;
}

document.addEventListener('DOMContentLoaded', () =>
{
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    var selection = document.getElementById("chn_name");
    var option = document.createElement('option');
    option.text = channel_list[0];
    option.value = channel_list[0];
    selection.add(option);

    socket.on('connect', () => {
        document.querySelectorAll('#message_submit').forEach(button => {
            button.onclick = () => {
                set_msg();
                const selection = eval(button.dataset.submit);
                socket.emit('submit message', selection);
            };
        });
    });

    socket.on('message_sent', data => {
        const li = document.createElement('li');
        li.innerHTML = `${data}`;
        document.querySelector('#msgs_sent').append(li);
    });



});