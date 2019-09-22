cadVariables = location.search.substring(1,location.search.length);
arrVariables = cadVariables.split("&");
for (i=0; i<arrVariables.length; i++) 
{
    arrVariableActual = arrVariables[i].split("=");
    if (isNaN(parseFloat(arrVariableActual[1])))
        eval(arrVariableActual[0]+"='"+unescape(arrVariableActual[1])+"';");
    else
        eval(arrVariableActual[0]+"="+arrVariableActual[1]+";");
}
