<?php
  $destino = "i52raquj@uco.es";
  $nombre = $_POST["nombre"];
  $apellidos = $_POST["apellidos"];
  $email = $_POST["email"];
  $mensaje = $_POST["mensaje"];

  $contenido = "Nombre: " . $nombre . "\nApellidos: " . $apellidos . "\nCorreo: " . $email . "\nMensaje: " . $mensaje;

  mail($destino, "Contacto", $contenido);
  //header("Location:thanks.html");
?>
