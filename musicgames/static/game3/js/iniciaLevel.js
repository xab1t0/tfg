//Tabla de configuración
var config = new Array (10);
config [0] = new Array(4);
config [1] = new Array(4);
config [2] = new Array(4);
config [3] = new Array(4);
config [4] = new Array(4);
config [5] = new Array(4);
config [6] = new Array(4);
config [7] = new Array(4);
config [8] = new Array(4);
config [9] = new Array(4);

// tipo de la familia de instrumentos
// 0 -> viento 1->cuerda 2->percusion 3->cuerdaFrotada 4->cuerdaPercutida 5->cuerdaPulsada 6->percusionDeterminada 7->percusionIndeterminada 8->vientoMadera 9->vientoMetal
// Los tres primeros contienen todos los intrumentos de la familia y a partir del 2 son especializaciones dentro de cada familia.


//Level 1
config[0][0]= 2; // Numero de instrumentos de familia
config[0][1]= 1; // Numero de intrusos
config[0][2]= 2; // familias de entre las que se seleccionan para el puzzle.
config[0][3]= 0; // numero minimo de entre el que se escoge la familia vale 0 hasta el 3 nivel para que sean las familias genéricas si se quiere que sean específicas
                 // el valor mínimo debe ser 3 para que omita las genéricas y solo use las específicas !! IMPORTANTE !!
config[0][4]= 2; // intrusos de entre los que se seleccionan para el puzzle
config[0][5]= 0; // numero minimo de entre el que se escoge al intruso, sucede lo mismo que para el dato de las familias minimo !! IMPORTANTE !!

//Level 2
config[1][0]= 2;
config[1][1]= 1;
config[1][2]= 2;
config[1][3]= 2;
config[1][4]= 2;
config[1][5]= 0;

//Level 3
config[2][0]= 3;
config[2][1]= 1;
config[2][2]= 9;
config[2][3]= 3;
config[2][4]= 9;
config[2][5]= 3;

//Level 4
config[3][0]= 3;
config[3][1]= 1;
config[3][2]= 9;
config[3][3]= 3;
config[3][4]= 9;
config[3][5]= 3;

//Level 5
config[4][0]= 3;
config[4][1]= 1;
config[4][2]= 9;
config[4][3]= 3;
config[4][4]= 9;
config[4][5]= 3;

//Level 6
config[5][0]= 3;
config[5][1]= 2;
config[5][2]= 9;
config[5][3]= 3;
config[5][4]= 9;
config[5][5]= 3;

//Level 7
config[6][0]= 4;
config[6][1]= 2;
config[6][2]= 9;
config[6][3]= 3;
config[6][4]= 9;
config[6][5]= 3;

//Level 8
config[7][0]= 4;
config[7][1]= 2;
config[7][2]= 9;
config[7][3]= 3;
config[7][4]= 9;
config[7][5]= 3;

//Level 9
config[8][0]= 4;
config[8][1]= 2;
config[8][2]= 9;
config[8][3]= 3;
config[8][4]= 9;
config[8][5]= 3;

//Level 10
config[9][0]= 4;
config[9][1]= 2;
config[9][2]= 9;
config[9][3]= 3;
config[9][4]= 9;
config[9][5]= 3;


var mng = new GameManager(config);
mng.initLevel(arrVariableActual[1]);