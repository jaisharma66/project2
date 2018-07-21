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
function add_channel()
{
    alert(document.querySelector('#channel_input').value);
    var channel_list = ['general'];
    var channel_added = document.querySelector('#channel_input').value;
    for(i = 0; i < channel_list.length; i++)
    {
        if(channel_added == channel_list[i])
        {
            return(alert("Channel has already been created"));
        }
    }
    channel_list.push(channel_added);
    var option = document.createElement('option');
    var selection = document.getElementById("chn_name");
    option.text = channel_added;
    option.value = channel_added;
    selection.add(option);
    selection.insertAdjacentHTML('beforeEND', selection.join('\n'));
}