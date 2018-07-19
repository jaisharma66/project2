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
function channel_add()
{

}