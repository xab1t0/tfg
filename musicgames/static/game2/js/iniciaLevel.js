//Tabla de configuración
var config = new Array (10);
config [0] = new Array(3);
config [1] = new Array(3);
config [2] = new Array(3);
config [3] = new Array(3);
config [4] = new Array(3);
config [5] = new Array(3);
config [6] = new Array(3);
config [7] = new Array(3);
config [8] = new Array(3);
config [9] = new Array(3);

//Level 1
config[0][0]= 2; // Notas adicionales que se van a añadir a las piezas del jugador
config[0][1]= 1; // Numero de piezas que van a formar parte del puzzle
config[0][2]= 5; // Piezas de entre las que se seleccionan para puzzle

//Level 2
config[1][0]= 2;
config[1][1]= 1;
config[1][2]= 5;

//Level 3
config[2][0]= 2;
config[2][1]= 1;
config[2][2]= 5;

//Level 4
config[3][0]= 3;
config[3][1]= 1;
config[3][2]= 9;

//Level 5
config[4][0]= 3;
config[4][1]= 1;
config[4][2]= 9;

//Level 6
config[5][0]= 3;
config[5][1]= 1;
config[5][2]= 9;

//Level 7
config[6][0]= 4;
config[6][1]= 3;
config[6][2]= 14;

//Level 8
config[7][0]= 4;
config[7][1]= 3;
config[7][2]= 14;

//Level 9
config[8][0]= 4;
config[8][1]= 3;
config[8][2]= 14;

//Level 10
config[9][0]= 4;
config[9][1]= 3;
config[9][2]= 14;


var mng = new GameManager(config);
mng.initLevel(arrVariableActual[1]);