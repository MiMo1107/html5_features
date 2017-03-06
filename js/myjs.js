/**
 * Created by Mikkel on 06-03-2017.
 */
// Check browser support
if (typeof(Storage) !== "undefined") {
    if (localStorage.count) {
        localStorage.count = Number(localStorage.count) + 1;
        if(localStorage.count % 10 == 0){
            alertify
                .alert("Congratulations this is your " + localStorage.count + "th visit!", function(){
                    alertify.message('Lucky bastard!');
                });
        }
    } else {
        localStorage.count = 1;
    }
    if(localStorage.log){
        arr = JSON.parse(localStorage.log);
    } else {
        arr = []
    }
    arr.push($.now());

    localStorage.log = JSON.stringify(arr);

    table = "<p>Antal besøg: " + localStorage.count + "</p><br><table class='table table-bordered table-striped'><thead><th>Besøgs tidspunkt(er)</th></thead><tbody>";
    jQuery.each( arr, function(index, value) {
        table += "<tr><td>" + new Date(value) + "</td></tr>"
    });
    table += "</tbody></table>";
    document.getElementById("modalText").innerHTML = table;

} else {
    document.getElementById("modalText").innerHTML = "Sorry, your browser does not support Web Storage...";
}

function setCookie(cname,cvalue,exMinutes) {
    var d = new Date();
    d.setTime(d.getTime() + (exMinutes*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        alertify
            .alert("Velkommen tilbage " + user, function(){
                alertify.message('Lucky bastard!');
            });
    } else {
        alertify.prompt("Venligst indtast dit navn:", "",
            function(evt, value ){
                setCookie("username", value, 10);
                alertify.success('Velkommen til ' + value);
            },
            function(){
                alertify.error('Anulleret');
            })
        ;
    }
}

function clearCookies() {
    var cookies = document.cookie;

    for (var i = 0; i < cookies.split(";").length; ++i)
    {
        var myCookie = cookies[i];
        var pos = myCookie.indexOf("=");
        var name = pos > -1 ? myCookie.substr(0, pos) : myCookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        alertify.message('En cookie blev slettet!');
    }
}

function clearLocalStorage() {
    localStorage.clear();
    alertify.message('Lokal lagering blev slettet!');
}
