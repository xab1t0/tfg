var temporizador;

function parar()
{
    clearInterval(temporizador);
}

function timeCero()
{
    s = document.getElementById("segundos");
    s.innerHTML = 50;
}

function tempo()
{
    s = document.getElementById("segundos");
    if(s.innerHTML!=0)
    {
        contador_s=s.innerHTML;
    }
    else{
        contador_s = 51;
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