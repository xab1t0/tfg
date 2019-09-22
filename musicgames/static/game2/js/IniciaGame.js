function pasarLevel(pagina,level)
{
    pagina +="?";
    pagina += "var1" + "=" + level + eval(level);
    if(level > 9)
        pagina = pagina.substring(0,pagina.length-2);
    else
        pagina = pagina.substring(0,pagina.length-1);
    location.href=pagina;
}