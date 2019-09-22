function movimiento()
{
    var dragged;
    /* evento que se lanza en el objeto arrastrado */

    document.addEventListener("drag", function(event) {

    }, false);

    document.addEventListener("dragstart", function(event) {
      // guarda una referencia del objeto arrastrado
      if(event.target.parentNode.parentNode.id == "piezas")
      {
        dragged = event.target;
      }
      else
      {
        dragged = "";
      }
        
      // hace el objeto semitransparente
      event.target.style.opacity = .5;
    }, false);

    document.addEventListener("dragend", function(event) {
      // resetea la transparencia del objeto
      event.target.style.opacity = "";
    }, false);

    /* evento lanzado al soltar el objeto */
   
      document.addEventListener("dragover", function(event) {
        // permitir soltar el objeto
        event.preventDefault();

      }, false);
    
    document.addEventListener("dragenter", function(event) {
      // cambia el color de la zona disponible para soltar el objeto
      if (event.target.className == "zona" && dragged.parentNode.parentNode.id == "piezas") {
        event.target.style.background = "rgb(8,140,253)";
      }

    }, false);

    document.addEventListener("dragleave", function(event) {
      // resetea el background de la zona 
      if (event.target.className == "zona") {
          event.target.style.background = "";
      }

    }, false);

    document.addEventListener("drop", function(event) {
            
              if (dragged.parentNode.parentNode.id == "piezas") {
                event.preventDefault();
              }
                event.target.style.background = "";
              // mueve el objeto arrastrado a la zona donde se suelta
            
              if (event.target.className == "zona" && event.target.childNodes.length == 0 && dragged.parentNode.parentNode.id == "piezas") { 
                  dragged.parentNode.parentNode.removeChild( dragged.parentNode );
                  event.target.appendChild( dragged );     
                  mng.comprobarSolucion(null);             
              }
              

            }, false);
}