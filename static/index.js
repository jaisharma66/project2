function disp_name()
{
    let disp_username = document.getElementById("disp_username").value;
    localStorage.setItem('disp_username', disp_username);
}

function retrieved_name()
{
    let showname = localStorage.getItem('disp_username');
    if (!localStorage.getItem('disp_username'))
        document.getElementById("displayname").innerHTML = "Type in Your Name";
    else
        document.getElementById("displayname").innerHTML = "Welcome, " + showname;
}

document.addEventListener('DOMContentLoaded', () =>
{
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connect', () => {
        document.querySelectorAll('#message_submit').forEach(button => {
            button.onclick = () => {
                alert("button clicked");
                var date = new Date();
                var name = localStorage.getItem('disp_username');
                var set_msg = document.querySelector('#message_box').value;
                var list = document.querySelector('#chn_name');
                var curr_channel = list.options[list.selectedIndex].value;
                alert(curr_channel + "current channel");
                socket.emit('submit message', {"date" : date.toString(), "name": name, "set_msg": set_msg, "curr_channel": curr_channel});
                //socket.emit('current messaging', {"date" : date.toString(), "name": name, "set_msg": set_msg, "curr_channel": curr_channel});
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
        socket.emit('connection validated');
        document.querySelectorAll('#chn_name').forEach(item => {
            item.onchange = () => {
                alert("value changed");
                var date = new Date();
                var name = localStorage.getItem('disp_username');
                var set_msg = document.querySelector('#message_box').value;
                var list = document.querySelector('#chn_name');
                var list_2 = document.querySelector('#chn_name');
                var curr_channel_2 = list_2.options[list_2.selectedIndex].value;
                localStorage.setItem('current_channel', curr_channel_2);
                socket.emit('current messaging', {"date" : date.toString(), "name": name, "set_msg": set_msg, "curr_channel": curr_channel_2});
            };
        });
        //DO I NEED THIS?
        // if(localStorage.getItem('current_channel'))
        //     socket.emit('current messaging', localStorage.getItem('current_channel'));
        // else
        //     socket.emit('current messaging', "general");
    });

    socket.on('current messaging returned', passed_data => {
        // var selectlist = document.querySelector('#msgs_sent').getElementsByTagName('li');
        // alert(selectlist, "what is this work???");
        // var i;
        // for(i = selectlist.options.length - 1; i >= 0; i--)
        // {
        //     selectlist.remove(i);
        // }
        alert("ENTRY NUMBER 1");
        // var list = document.querySelector("#chn_name");
        // // var curr_channel = list.options[list.selectedIndex.value];
        // alert(data);
        // // var values = channel_list_msg[curr_channel];
        // var values = channel_list_msg[data];
        var channel_list_msg = passed_data["channel_list_msg"];
        var data = passed_data["data"];
        var values = channel_list_msg[data["curr_channel"]];
        alert(values.length + " PAY ATTN this value is for the alert mes");
        try
        {
            alert("does it enter here?");
            const element_number = document.querySelector('#msgs_sent');
            while(element_number.firstChild){
                element_number.removeChild(element_number.firstChild);
            }
            alert("does this work? 83 and " + values.length);
            for(var x = 0; x < values.length; x++)
            {
                alert("ENTRY INTO THE FOR LOOP REQUIRED " + x)
                const msg_display = document.createElement('li');
                msg_display.innerHTML = `${data["name"]} : ${values[x]} - ${data["date"]}`;
                document.querySelector('#msgs_sent').append(msg_display);
            }
        }
        catch(err)
        {
            try
            {
                var element_number = document.querySelector('#msgs_sent');
                element_number.empty();
            }
            catch(err2)
            {
                alert("All Messages Loaded!");
            }
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
        if(localStorage.getItem('current_channel'))
            document.getElementById('chn_name').value = localStorage.getItem('current_channel');
    });

    socket.on('message_sent', data => {
        var list = document.querySelector('#chn_name');
        var curr_channel = list.options[list.selectedIndex].value;
        if(curr_channel === data["curr_channel"])
        {
            const li = document.createElement('li');
            li.innerHTML = `${data["name"]} : ${data["set_msg"]} - ${data["date"]}`;
            document.querySelector('#msgs_sent').append(li);
        }
        else{
            alert("message in another chat");
        }
    });

    socket.on('created new channel', new_channel => {
        const option = document.createElement('option');
        option.innerHTML = `${new_channel}`;
        document.querySelector('#chn_name').append(option);
    });

});