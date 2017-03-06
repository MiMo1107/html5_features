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

    table = "<table class='table table-bordered table-striped'><thead><th>Besøgs tidspunkt(er)</th></thead><tbody>";
    jQuery.each( arr, function(index, value) {
        table += "<tr><td>" + new Date(value) + "</td></tr>"
    });
    table += "</tbody></table><br><p>Antal besøg: " + localStorage.count + "</p>";
    document.getElementById("modalText").innerHTML = table;

} else {
    document.getElementById("modalText").innerHTML = "Sorry, your browser does not support Web Storage...";
}