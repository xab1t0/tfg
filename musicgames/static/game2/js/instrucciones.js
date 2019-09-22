var instruccion = document.getElementById("instruccion");
var span = document.getElementsByClassName("close")[0];

function visible()
{
    instruccion.style.display = "block";
}

span.onclick = function() {
    instruccion.style.display = "none";
}

window.onclick = function(event) {
    if(event.target == instruccion) {
        instruccion.style.display = "none";
    }
}