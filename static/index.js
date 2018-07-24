// var channel_list = ['general'];
var cur_msg = null;

function disp_name()
{
    let disp_username = document.getElementById("disp_username").value;
    localStorage.setItem('disp_username', disp_username);
}


// function set_msg()
// {
//     cur_msg = document.querySelector('#message_box').value;
// }

function retrieved_name()
{
    let showname = localStorage.getItem('disp_username');
    if (!localStorage.getItem('disp_username'))
        document.getElementById("displayname").innerHTML = "Type in Your Name";
    else
        document.getElementById("displayname").innerHTML = "Welcome, " + showname;
}

// function add_channel()
// {
//     var selection = document.getElementById("chn_name");
//     var channel_added = document.querySelector('#channel_input').value;
//     var option = document.createElement('option');
//     for(var i = 0; i < channel_list.length; i++)
//     {
//         if(channel_added == channel_list[i])
//         {
//             return(alert("Channel has already been created"));
//         }
//     }
//     channel_list.push(channel_added);
//     option.text = channel_added;
//     option.value = channel_added;
//     selection.add(option);
//     selection.insertAdjacentHTML('beforeEND', selection.join('\n'));
// }

// function input_val()
// {
//     return cur_msg;
// }

document.addEventListener('DOMContentLoaded', () =>
{
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // var selection = document.getElementById("chn_name");
    // var option = document.createElement('option');
    // option.text = channel_list[0];
    // option.value = channel_list[0];
    // selection.add(option);

    socket.on('connect', () => {
        document.querySelectorAll('#message_submit').forEach(button => {
            button.onclick = () => {
                alert("button clicked");
                var date = new Date();
                var name = localStorage.getItem('usernmae');
                var set_msg = document.querySelector('#message_box').value;
                var list = document.querySelector('#chn_name');
                var curr_channel = list.options[list.selectedIndex].value;
                alert(curr_channel + "current channel");
                socket.emit('submit message', {"date" : date.toString(), "name": name, "set_msg": set_msg, "curr_channel": curr_channel});

                // var date = new Date();
                // set_msg();
                // const selection = eval(button.dataset.submit);
                // socket.emit('submit message', selection);
            };
        });

        document.querySelectorAll('#button_create').forEach(button_2 => {
            button_2.onclick = () => {
                alert("this works");
                var channel_added = document.querySelector('#channel_input').value;
                alert(channel_added + "This channel")
                socket.emit('channel added', channel_added);
            };
        });
        // var list = document.querySelector('#chn_name');
        // var curr_channel = list.options[list.selectedIndex].value;
        socket.emit('connection validated', curr_channel);
        socket.emit('current messaging');
    });

    socket.on('current messaging returned', messages => {
        // var selectlist = document.querySelector('#msgs_sent').getElementsByTagName('li');
        // alert(selectlist, "what is this work???");
        // var i;
        // for(i = selectlist.options.length - 1; i >= 0; i--)
        // {
        //     selectlist.remove(i);
        // }
        alert(messages, "socketon curr msgs");
        alert(messages.length, "length");
        try
        {
            for(var x = 1; x < messages.length; x++)
            {
                const msg_display = document.createElement('li');
                msg_display.innerHTML = `${messages[x]}`;
                document.querySelector('#msgs_sent').append(msg_display);
            }
        }
        catch(err)
        {
            alert("All Messages Loaded!");
        }
    });

    socket.on('channels_lists', loaded_channels => {
        alert("on connect");
        var selectbox = document.querySelector('#chn_name');
        var i;
        for(i = selectbox.options.length - 1; i >= 0; i--)
        {
            selectbox.remove(i);
        }
        alert("new " + loaded_channels);
        for(var x = 0; x < loaded_channels.length; x++){
            const option_load = document.createElement('option');
            alert(loaded_channels[x], "channels that have been loaded");
            option_load.innerHTML = `${loaded_channels[x]}`;
            document.querySelector('#chn_name').append(option_load);
        }
    });

    socket.on('message_sent', data => {
        alert("This is america", data);
        const li = document.createElement('li');
        li.innerHTML = `${data["set_msg"]}`;
        document.querySelector('#msgs_sent').append(li);
    });

    socket.on('created new channel', new_channel => {
        const option = document.createElement('option');
        option.innerHTML = `${new_channel}`;
        document.querySelector('#chn_name').append(option);
    });

});