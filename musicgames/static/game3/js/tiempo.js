var temporizador;

function parar()
{
    clearInterval(temporizador);
}

function timeCero()
{
    s = document.getElementById("segundos");
    s.innerHTML = 20;
}

function tempo()
{
    s = document.getElementById("segundos");
    if(s.innerHTML!=0)
    {
        contador_s=s.innerHTML;
    }
    else{
        contador_s = 21;
    }
    clearInterval(temporizador);
    temporizador = setInterval(
        function()
        {
            contador_s--;
            s.innerHTML = contador_s;
            if(s.innerHTML == 0)
            {
                parar();
                mng.fallaTiempo();
                tempo();
            }
        }
    ,1000);
}