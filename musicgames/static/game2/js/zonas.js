//zonas que el jugador va a tener que rellanar con las notas adecuadas para resolver la equivalencia
function zonas(numeroZonas)
{
  for(var i=0;i<numeroZonas;i++)
  {
    var nuevaZona = document.createElement("div");
    var id = document.createAttribute("id");
    id.value = "zona-" + i;
    var atributo3 = document.createAttribute("class");
    atributo3.value="zona";
    nuevaZona.setAttributeNode(atributo3);
    nuevaZona.setAttributeNode(id);
    proof.appendChild(nuevaZona);
  }
    
  //genera un div de separacion
    var igual = document.createElement("div");
    var atributo4 = document.createAttribute("class");
    atributo4.value="igual";
    igual.setAttributeNode(atributo4);

    proof.appendChild(igual);
}

