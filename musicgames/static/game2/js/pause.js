var pause = document.getElementById("pausa");
var span = document.getElementsByClassName("close")[0];

function visible()
{
    pause.style.display = "block";
    parar();
}

span.onclick = function() {
    pause.style.display = "none";
    tempo();
}

window.onclick = function(event) {
    if(event.target == pause) {
        pause.style.display = "none";
        tempo();
    }
}