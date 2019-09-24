var name = "Daniel";
var score = 0;
var maxmScore = 0;
var showkeys = true;
var keyboardtype = 1;
var musicalkey = 0;
var symbols = 0;
var enablednotes = [true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false];
var notespeed = 24000;
var notesamount = 10;
var initialpos = 0;
var noteindex = 0;
var arrayNotes = [];
var inGame = 0;
var remainingNotes = 10;

function cerrarVentana(){

    window.location.replace("/game");
}

function getPlayerName(){

    name = document.getElementById("PlayerName").value;


    if(name == ""){
        name = "Daniel";
    }

    document.getElementById("PlayerDataInput").style.display = "none";
    document.getElementById("Menu").style.display = "inline";
    document.getElementById("userName").innerHTML = name;
    document.getElementById("PlayerScore").innerHTML = "Puntuación anterior: " + score.toString();
    document.getElementById("MaxScore").innerHTML = "Mejor puntuación: " + maxmScore.toString();

}

function accessGameSettings(){

    document.getElementById("Menu").style.display = "none";
    document.getElementById("GameSettings").style.display = "inline";

}

function saveGameSettings(){

    if(document.getElementById("musicalkeysol").checked == true){
        musicalkey=0;
    } else {
        musicalkey=1;
    }

    if(document.getElementById("symbolstandard").checked == true){
        symbols=0;
    } else if(document.getElementById("symbolcolor").checked == true){
        symbols=1;
    } else if(document.getElementById("symbolfigure").checked == true){
        symbols = 2;
        enablednotes = [true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false];
    }

    if(document.getElementById("note1").checked == true){
        enablednotes[0] = true;
    } else enablednotes[0] = false;
    if(document.getElementById("note2").checked == true){
        enablednotes[1] = true;
    } else enablednotes[1] = false;
    if(document.getElementById("note3").checked == true){
        enablednotes[2] = true;
    } else enablednotes[2] = false;
    if(document.getElementById("note4").checked == true){
        enablednotes[3] = true;
    } else enablednotes[3] = false;
    if(document.getElementById("note5").checked == true){
        enablednotes[4] = true;
    } else enablednotes[4] = false;
    if(document.getElementById("note6").checked == true){
        enablednotes[5] = true;
    } else enablednotes[5] = false;
    if(document.getElementById("note7").checked == true){
        enablednotes[6] = true;
    } else enablednotes[6] = false;
    if(document.getElementById("note8").checked == true){
        enablednotes[7] = true;
    } else enablednotes[7] = false;
    if(document.getElementById("note9").checked == true){
        enablednotes[8] = true;
    } else enablednotes[8] = false;
    if(document.getElementById("note10").checked == true){
        enablednotes[9] = true;
    } else enablednotes[9] = false;
    if(document.getElementById("note11").checked == true){
        enablednotes[10] = true;
    } else enablednotes[10] = false;
    if(document.getElementById("note12").checked == true){
        enablednotes[11] = true;
    } else enablednotes[11] = false;
    if(document.getElementById("note13").checked == true){
        enablednotes[12] = true;
    } else enablednotes[12] = false;
    if(document.getElementById("note14").checked == true){
        enablednotes[13] = true;
    } else enablednotes[13] = false;
    if(document.getElementById("note15").checked == true){
        enablednotes[14] = true;
    } else enablednotes[14] = false;
    if(document.getElementById("note16").checked == true){
        enablednotes[15] = true;
    } else enablednotes[15] = false;
    if(document.getElementById("note17").checked == true){
        enablednotes[16] = true;
    } else enablednotes[16] = false;
    if(document.getElementById("note18").checked == true){
        enablednotes[17] = true;
    } else enablednotes[17] = false;

    if(enablednotes.every == false){
        enablednotes = [true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false];
    }

    if(document.getElementById("speed1").checked == true){
        notespeed = 24000;
    } else if(document.getElementById("speed2").checked == true){
        notespeed = 18000;
    } else if(document.getElementById("speed3").checked == true){
        notespeed = 9000;
    } else if(document.getElementById("speed4").checked == true){
        notespeed = 5000;
    }

    notesamount = document.getElementById("notesnumber").value;

    if(musicalkey == 0){
        document.getElementById("musicalkeyimage").src = "../../../static/game1/img/clavesol.png";
        document.getElementById("musicalkeyimage").className = "musicalkeysol";
    } else {
        document.getElementById("musicalkeyimage").src = "../../../static/game1/img/clavefa.png";
        document.getElementById("musicalkeyimage").className = "musicalkeyfa";
    }

    document.getElementById("GameSettings").style.display = "none";
    document.getElementById("Menu").style.display = "inline";

}

function accessPianoSettings(){

    document.getElementById("Menu").style.display = "none";
    document.getElementById("PianoSettings").style.display = "inline";

}

function savePianoSettings(){

    showkeys = document.getElementById("noteskeyboard").checked;

    setKeyboardText();

    if(document.getElementById("keyboard1").checked == true){
        keyboardtype = 1;
        enableStandardPiano();
    } else if(document.getElementById("keyboard2").checked == true){
        keyboardtype = 2;
        enableStandardPiano();
    } else if(document.getElementById("keyboard3").checked == true){
        keyboardtype = 3;
        enableStandardPiano();
    } else if(document.getElementById("keyboard4").checked == true){
        keyboardtype = 4;
        enableButtonsPiano();
    } else if(document.getElementById("keyboard5").checked == true){
        keyboardtype = 5;
        enableButtonsPiano();
    }

    setKeyboardColors();


    document.getElementById("PianoSettings").style.display = "none";
    document.getElementById("Menu").style.display = "inline";

}

function enableStandardPiano(){

    document.getElementById("KeyboardButtons").style.display = "none";
    document.getElementById("KeyboardStandard").style.display = "inline";

}

function enableButtonsPiano(){


    document.getElementById("KeyboardStandard").style.display = "none";
    document.getElementById("KeyboardButtons").style.display = "inline";
}



async function startGame(){

    document.getElementById("Menu").style.display = "none";

    var rightPos = window.innerWidth - (window.innerWidth * 0.05);
    rightPos = rightPos - 100;
    initialPos = "translateX(" + rightPos.toString() + "px)";

    if(keyboardtype == 4){
        symbols = 1;
        enablednotes = [true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false];
    }

    if(keyboardtype == 5){
        symbols = 2;
        enablednotes = [true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false];
    }



    gameManager();

}

async function gameManager(){

    inGame = 1;
    score = 0;
    document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();

    for(remainingNotes = notesamount; remainingNotes > 0;){
        generateKeynote(generateRandomKeynote());
        remainingNotes--;
        await sleep(notespeed/4);
    }

}

async function endGame(){

    if(score > maxmScore){
        maxmScore = score;
    }

    inGame = 0;
    document.getElementById("Menu").style.display = "inline";
    document.getElementById("userName").innerHTML = name;
    document.getElementById("PlayerScore").innerHTML = "Puntuación anterior: " + score.toString();
    document.getElementById("MaxScore").innerHTML = "Mejor puntuación: " + maxmScore.toString();

}

function generateRandomKeynote(){

    var x = Math.floor((Math.random()*1000)%18 );

    switch(x){
        case 0:
            if(enablednotes[0] == true){
                return "do";
            } else return generateRandomKeynote();
        case 1:
            if(enablednotes[1] == true){
                return "re";
            } else return generateRandomKeynote();
        case 2:
            if(enablednotes[2] == true){
                return "mi";
            } else return generateRandomKeynote();
        case 3:
            if(enablednotes[3] == true){
                return "fa";
            } else return generateRandomKeynote();
        case 4:
            if(enablednotes[4] == true){
                return "sol";
            } else return generateRandomKeynote();
        case 5:
            if(enablednotes[5] == true){
                return "la";
            } else return generateRandomKeynote();
        case 6:
            if(enablednotes[6] == true){
                return "si";
            } else return generateRandomKeynote();
        case 7:
            if(enablednotes[7] == true){
                return "doalto";
            } else return generateRandomKeynote();
        case 8:
            if(enablednotes[8] == true){
                return "dosostenido";
            } else return generateRandomKeynote();
        case 9:
            if(enablednotes[9] == true){
                return "rebemol";
            } else return generateRandomKeynote();
        case 10:
            if(enablednotes[10] == true){
                return "resostenido";
            } else return generateRandomKeynote();
        case 11:
            if(enablednotes[11] == true){
                return "mibemol";
            } else return generateRandomKeynote();
        case 12:
            if(enablednotes[12] == true){
                return "fasostenido";
            } else return generateRandomKeynote();
        case 13:
            if(enablednotes[13] == true){
                return "solbemol";
            } else return generateRandomKeynote();
        case 14:
            if(enablednotes[14] == true){
                return "solsostenido";
            } else return generateRandomKeynote();
        case 15:
            if(enablednotes[15] == true){
                return "labemol";
            } else return generateRandomKeynote();
        case 16:
            if(enablednotes[16] == true){
                return "lasostenido";
            } else return generateRandomKeynote();
        case 17:
            if(enablednotes[17] == true){
                return "sibemol";
            } else return generateRandomKeynote();

    };

}

function setKeyboardText(){

    if(showkeys == true){
        document.getElementById("keytext_01").innerHTML = "DO";
        document.getElementById("keytext_02").innerHTML = "RE";
        document.getElementById("keytext_03").innerHTML = "MI";
        document.getElementById("keytext_04").innerHTML = "FA";
        document.getElementById("keytext_05").innerHTML = "SOL";
        document.getElementById("keytext_06").innerHTML = "LA";
        document.getElementById("keytext_07").innerHTML = "SI";
        document.getElementById("keytext_08").innerHTML = "DO";
        document.getElementById("keytext_09").innerHTML = "RE";
        document.getElementById("keytext_10").innerHTML = "MI";
        document.getElementById("keytext_11").innerHTML = "FA";
        document.getElementById("keytext_12").innerHTML = "SOL";
        document.getElementById("keytext_13").innerHTML = "LA";
        document.getElementById("keytext_14").innerHTML = "SI";
        document.getElementById("keytext_15").innerHTML = "DO";
        document.getElementById("keytext_16").innerHTML = "DO# REb";
        document.getElementById("keytext_17").innerHTML = "RE# MIb";
        document.getElementById("keytext_18").innerHTML = "FA# SOLb";
        document.getElementById("keytext_19").innerHTML = "SOL# LAb";
        document.getElementById("keytext_20").innerHTML = "LA# SIb";
        document.getElementById("keytext_21").innerHTML = "DO# REb";
        document.getElementById("keytext_22").innerHTML = "RE# MIb";
        document.getElementById("keytext_23").innerHTML = "FA# SOLb";
        document.getElementById("keytext_24").innerHTML = "SOL# LAb";
        document.getElementById("keytext_25").innerHTML = "LA# SIb";
        document.getElementById("keytext_26").innerHTML = "DO";
        document.getElementById("keytext_27").innerHTML = "RE";
        document.getElementById("keytext_28").innerHTML = "MI";
        document.getElementById("keytext_29").innerHTML = "FA";
        document.getElementById("keytext_30").innerHTML = "SOL";
        document.getElementById("keytext_31").innerHTML = "LA";
        document.getElementById("keytext_32").innerHTML = "SI";

    } else {

        document.getElementById("keytext_01").innerHTML = "";
        document.getElementById("keytext_02").innerHTML = "";
        document.getElementById("keytext_03").innerHTML = "";
        document.getElementById("keytext_04").innerHTML = "";
        document.getElementById("keytext_05").innerHTML = "";
        document.getElementById("keytext_06").innerHTML = "";
        document.getElementById("keytext_07").innerHTML = "";
        document.getElementById("keytext_08").innerHTML = "";
        document.getElementById("keytext_09").innerHTML = "";
        document.getElementById("keytext_10").innerHTML = "";
        document.getElementById("keytext_11").innerHTML = "";
        document.getElementById("keytext_12").innerHTML = "";
        document.getElementById("keytext_13").innerHTML = "";
        document.getElementById("keytext_14").innerHTML = "";
        document.getElementById("keytext_15").innerHTML = "";
        document.getElementById("keytext_16").innerHTML = "";
        document.getElementById("keytext_17").innerHTML = "";
        document.getElementById("keytext_18").innerHTML = "";
        document.getElementById("keytext_19").innerHTML = "";
        document.getElementById("keytext_20").innerHTML = "";
        document.getElementById("keytext_21").innerHTML = "";
        document.getElementById("keytext_22").innerHTML = "";
        document.getElementById("keytext_23").innerHTML = "";
        document.getElementById("keytext_24").innerHTML = "";
        document.getElementById("keytext_25").innerHTML = "";

    }
}

function setKeyboardColors(){

    if(keyboardtype == 1){

        document.getElementById("keycolor_01").style = "display:none;";
        document.getElementById("keycolor_02").style = "display:none;";
        document.getElementById("keycolor_03").style = "display:none;";
        document.getElementById("keycolor_04").style = "display:none;";
        document.getElementById("keycolor_05").style = "display:none;";
        document.getElementById("keycolor_06").style = "display:none;";
        document.getElementById("keycolor_07").style = "display:none;";
        document.getElementById("keycolor_08").style = "display:none;";
        document.getElementById("keycolor_09").style = "display:none;";
        document.getElementById("keycolor_10").style = "display:none;";
        document.getElementById("keycolor_11").style = "display:none;";
        document.getElementById("keycolor_12").style = "display:none;";
        document.getElementById("keycolor_13").style = "display:none;";
        document.getElementById("keycolor_14").style = "display:none;";
        document.getElementById("keycolor_15").style = "display:none;";

    } else if(keyboardtype == 2){

        document.getElementById("keycolor_01").style = "display:none;";
        document.getElementById("keycolor_02").style = "display:none;";
        document.getElementById("keycolor_03").style = "display:none;";
        document.getElementById("keycolor_04").style = "display:none;";
        document.getElementById("keycolor_05").style = "display:none;";
        document.getElementById("keycolor_06").style = "display:none;";
        document.getElementById("keycolor_07").style = "display:none;";
        document.getElementById("keycolor_08").style = "display:block;";
        document.getElementById("keycolor_09").style = "display:none;";
        document.getElementById("keycolor_10").style = "display:none;";
        document.getElementById("keycolor_11").style = "display:none;";
        document.getElementById("keycolor_12").style = "display:none;";
        document.getElementById("keycolor_13").style = "display:none;";
        document.getElementById("keycolor_14").style = "display:none;";
        document.getElementById("keycolor_15").style = "display:none;";

    } else if(keyboardtype == 3) {

        document.getElementById("keycolor_01").style = "display:block;";
        document.getElementById("keycolor_02").style = "display:block;";
        document.getElementById("keycolor_03").style = "display:block;";
        document.getElementById("keycolor_04").style = "display:block;";
        document.getElementById("keycolor_05").style = "display:block;";
        document.getElementById("keycolor_06").style = "display:block;";
        document.getElementById("keycolor_07").style = "display:block;";
        document.getElementById("keycolor_08").style = "display:block;";
        document.getElementById("keycolor_09").style = "display:block;";
        document.getElementById("keycolor_10").style = "display:block;";
        document.getElementById("keycolor_11").style = "display:block;";
        document.getElementById("keycolor_12").style = "display:block;";
        document.getElementById("keycolor_13").style = "display:block;";
        document.getElementById("keycolor_14").style = "display:block;";
        document.getElementById("keycolor_15").style = "display:block;";

    } else if(keyboardtype == 4) {


        document.getElementById("keytext_26").innerHTML = "DO";
        document.getElementById("keytext_27").innerHTML = "RE";
        document.getElementById("keytext_28").innerHTML = "MI";
        document.getElementById("keytext_29").innerHTML = "FA";
        document.getElementById("keytext_30").innerHTML = "SOL";
        document.getElementById("keytext_31").innerHTML = "LA";
        document.getElementById("keytext_32").innerHTML = "SI";
        document.getElementById("keysymbol_01").style = "display:none;";
        document.getElementById("keysymbol_02").style = "display:none;";
        document.getElementById("keysymbol_03").style = "display:none;";
        document.getElementById("keysymbol_04").style = "display:none;";
        document.getElementById("keysymbol_05").style = "display:none;";
        document.getElementById("keysymbol_06").style = "display:none;";
        document.getElementById("keysymbol_07").style = "display:none;";
        document.getElementById("keycolor_26").style = "display:block;";
        document.getElementById("keycolor_26").style = "display:block;";
        document.getElementById("keycolor_27").style = "display:block;";
        document.getElementById("keycolor_28").style = "display:block;";
        document.getElementById("keycolor_29").style = "display:block;";
        document.getElementById("keycolor_30").style = "display:block;";
        document.getElementById("keycolor_31").style = "display:block;";
        document.getElementById("keycolor_32").style = "display:block;";


    } else if(keyboardtype == 5) {

        document.getElementById("keytext_26").innerHTML = "";
        document.getElementById("keytext_27").innerHTML = "";
        document.getElementById("keytext_28").innerHTML = "";
        document.getElementById("keytext_29").innerHTML = "";
        document.getElementById("keytext_30").innerHTML = "";
        document.getElementById("keytext_31").innerHTML = "";
        document.getElementById("keytext_32").innerHTML = "";
        document.getElementById("keysymbol_01").style = "display:block;";
        document.getElementById("keysymbol_02").style = "display:block;";
        document.getElementById("keysymbol_03").style = "display:block;";
        document.getElementById("keysymbol_04").style = "display:block;";
        document.getElementById("keysymbol_05").style = "display:block;";
        document.getElementById("keysymbol_06").style = "display:block;";
        document.getElementById("keysymbol_07").style = "display:block;";
        document.getElementById("keycolor_26").style = "display:none;";
        document.getElementById("keycolor_27").style = "display:none;";
        document.getElementById("keycolor_28").style = "display:none;";
        document.getElementById("keycolor_29").style = "display:none;";
        document.getElementById("keycolor_30").style = "display:none;";
        document.getElementById("keycolor_31").style = "display:none;";
        document.getElementById("keycolor_32").style = "display:none;";

    }



}

async function generateKeynote(note){

    var cssclass = "note";
    var source = "../../../static/game1/img/";

    //Generación ruta de imagen.

    if(notespeed == 24000){
        source = source + "redonda";
    } else if(notespeed == 18000){
        source = source + "blanca";
    } else if(notespeed == 9000){
        source = source + "negra";
    } else if(notespeed == 5000){
        source = source + "corchea";
    }

    if(note.search("sostenido") != -1){
        source = source + "sostenida.png";
    } else if(note.search("bemol") != -1){
        source = source + "bemol.png";
    } else {
        source = source + ".png";
    }

    //Generación clase nota.

    if(musicalkey == 0){
        cssclass = cssclass + "sol";
    } else cssclass = cssclass + "fa";

    cssclass = cssclass + note;

    var noteindexst = "note_" + noteindex.toString();
    noteindex++;
    var element = document.createElement("img");
    if(symbols == 1){
        switch(cssclass){
            case "notesoldo":
            case "notefado" :
            case "notesoldosostenido" :
            case "notefadosostenido" :
            case "notefadoalto" :
                element.setAttribute("style","filter: invert(18%) sepia(100%) saturate(7486%) hue-rotate(358deg) brightness(90%) contrast(125%);");
                break;
            case "notesolre":
            case "notefare":
            case "notesolresostenido":
            case "notefaresostenido":
            case "notesolrebemol":
            case "notefarebemol":
                element.setAttribute("style","filter: invert(53%) sepia(39%) saturate(2750%) hue-rotate(2deg) brightness(105%) contrast(103%);");
                break;
            case "notesolmi":
            case "notefami":
            case "notesolmibemol":
            case "notefamibemol":
                element.setAttribute("style","filter: invert(100%) sepia(100%) saturate(7496%) hue-rotate(352deg) brightness(99%) contrast(105%);");
                break;
            case "notesolfa":
            case "notefafa":
            case "notesolfasostenido":
            case "notefafasostenido":
                element.setAttribute("style","filter: invert(30%) sepia(97%) saturate(1660%) hue-rotate(85deg) brightness(95%) contrast(99%);");
                break;
            case "notesolsol":
            case "notefasol":
            case "notesolsolsostenido":
            case "notefasolsostenido":
            case "notesolsolbemol":
            case "notefasolbemol":
                element.setAttribute("style","filter: invert(93%) sepia(68%) saturate(6802%) hue-rotate(89deg) brightness(107%) contrast(108%);");
                break;
            case "notesolla":
            case "notefala":
            case "notesollasostenido":
            case "notefalasostenido":
            case "notesollabemol":
            case "notefalabemol":
                element.setAttribute("style","filter: invert(9%) sepia(100%) saturate(6990%) hue-rotate(239deg) brightness(107%) contrast(119%);"); break;
            case "notesolsi":
            case "notefasi":
            case "notesolsisostenido":
            case "notefasisostenido":
            case "notesolsibemol":
            case "notefasibemol":
                element.setAttribute("style","filter: invert(19%) sepia(87%) saturate(4469%) hue-rotate(295deg) brightness(107%) contrast(124%);"); break;
            default:
            break;

        }
    }

    if(symbols == 2){
        switch(cssclass){
            case "notesoldo":
            case "notefado" :
            case "notesoldosostenido" :
            case "notefadosostenido" :
            case "notefadoalto" :
                source = "../../../static/game1/img/symbol_01.png";
                break;
            case "notesolre":
            case "notefare":
            case "notesolresostenido":
            case "notefaresostenido":
            case "notesolrebemol":
            case "notefarebemol":
                source = "../../../static/game1/img/symbol_02.png";
                break;
            case "notesolmi":
            case "notefami":
            case "notesolmibemol":
            case "notefamibemol":
                source = "../../../static/game1/img/symbol_03.png";
                break;
            case "notesolfa":
            case "notefafa":
            case "notesolfasostenido":
            case "notefafasostenido":
                source = "../../../static/game1/img/symbol_04.png";
                break;
            case "notesolsol":
            case "notefasol":
            case "notesolsolsostenido":
            case "notefasolsostenido":
            case "notesolsolbemol":
            case "notefasolbemol":
                source = "../../../static/game1/img/symbol_05.png";
                break;
            case "notesolla":
            case "notefala":
            case "notesollasostenido":
            case "notefalasostenido":
            case "notesollabemol":
            case "notefalabemol":
                source = "../../../static/game1/img/symbol_06.png";
                break;
            case "notesolsi":
            case "notefasi":
            case "notesolsisostenido":
            case "notefasisostenido":
            case "notesolsibemol":
            case "notefasibemol":
                source = "../../../static/game1/img/symbol_07.png";
                break;
            default:
                source = "../../../static/game1/img/symbol_08.png";
            break;

            }

    };

    element.setAttribute("src",source);
    element.setAttribute("class",cssclass);
    element.setAttribute("id",noteindexst);
    element.animate([
        { transform: initialPos },
        { transform: 'translateX(0px)' }
      ], {
        duration: notespeed,
        iterations: Infinity
    });

    document.getElementById("Game").appendChild(element);
    arrayNotes.push(element);

    await sleep(notespeed);

    for(var i = 0; i < arrayNotes.length; i++){

        if(arrayNotes[i].id == noteindexst){

            document.getElementById("Game").removeChild(document.getElementById(noteindexst));
            arrayNotes.splice(i,1);
            score = score - 5;
            document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
            if(remainingNotes == 0 && arrayNotes.length == 0){
                endGame();
            }

        }
    }

}

function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

function deleteKey(key){

    var composedkey = "note" + key;

    var audio = new Audio("../../../static/game1/snd/" + key + ".wav");
    audio.play();

    if(inGame == 1){

        if(composedkey == "notebutton_01"){

            for(var j = 0; j < arrayNotes.length; j++){

                if(arrayNotes[j].className == "notefado" || arrayNotes[j].className == "notesoldo"){

                    document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                    arrayNotes.splice(j,1);
                    score=score+5;
                    document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                    if(remainingNotes == 0 && arrayNotes.length == 0){
                        endGame();
                    }
                    return;
                }
            }

        } else if(composedkey == "notebutton_02"){

            for(var j = 0; j < arrayNotes.length; j++){

                if(arrayNotes[j].className == "notefare" || arrayNotes[j].className == "notesolre"){

                    document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                    arrayNotes.splice(j,1);
                    score=score+5;
                    document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                    if(remainingNotes == 0 && arrayNotes.length == 0){
                        endGame();
                    }
                    return;
                }
            }

        } else if(composedkey == "notebutton_03"){

            for(var j = 0; j < arrayNotes.length; j++){

                if(arrayNotes[j].className == "notefami" || arrayNotes[j].className == "notesolmi"){

                    document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                    arrayNotes.splice(j,1);
                    score=score+5;
                    document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                    if(remainingNotes == 0 && arrayNotes.length == 0){
                        endGame();
                    }
                    return;
                }
            }

        } else if(composedkey == "notebutton_04"){

            for(var j = 0; j < arrayNotes.length; j++){

                if(arrayNotes[j].className == "notefafa" || arrayNotes[j].className == "notesolfa"){

                    document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                    arrayNotes.splice(j,1);
                    score=score+5;
                    document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                    if(remainingNotes == 0 && arrayNotes.length == 0){
                        endGame();
                    }
                    return;
                }
            }

        } else if(composedkey == "notebutton_05"){

            for(var j = 0; j < arrayNotes.length; j++){

                if(arrayNotes[j].className == "notefasol" || arrayNotes[j].className == "notesolsol"){

                    document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                    arrayNotes.splice(j,1);
                    score=score+5;
                    document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                    if(remainingNotes == 0 && arrayNotes.length == 0){
                        endGame();
                    }
                    return;
                }
            }

        } else if(composedkey == "notebutton_06"){

            for(var j = 0; j < arrayNotes.length; j++){

                if(arrayNotes[j].className == "notefala" || arrayNotes[j].className == "notesolla"){

                    document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                    arrayNotes.splice(j,1);
                    score=score+5;
                    document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                    if(remainingNotes == 0 && arrayNotes.length == 0){
                        endGame();
                    }
                    return;
                }
            }

        } else if(composedkey == "notebutton_07"){

            for(var j = 0; j < arrayNotes.length; j++){

                if(arrayNotes[j].className == "notefasi" || arrayNotes[j].className == "notesolsi"){

                    document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                    arrayNotes.splice(j,1);
                    score=score+5;
                    document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                    if(remainingNotes == 0 && arrayNotes.length == 0){
                        endGame();
                    }
                    return;
                }
            }

        } else if(composedkey == "notefaespecial_01"){

            for(var j = 0; j < arrayNotes.length; j++){

                if(arrayNotes[j].className == "notefadosostenido" || arrayNotes[j].className == "notefarebemol"){

                    document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                    arrayNotes.splice(j,1);
                    score=score+5;
                    document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                    if(remainingNotes == 0 && arrayNotes.length == 0){
                        endGame();
                    }
                    return;
                }
            }

        } else if(composedkey == "notefaespecial_02"){

            for(var j = 0; j < arrayNotes.length; j++){

                if(arrayNotes[j].className == "notefaresostenido" || arrayNotes[j].className == "notefamibemol"){

                    document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                    arrayNotes.splice(j,1);
                    score=score+5;
                    document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                    if(remainingNotes == 0 && arrayNotes.length == 0){
                        endGame();
                    }
                    return;
                }
            }

        } else if(composedkey == "notefaespecial_03"){

            for(var j = 0; j < arrayNotes.length; j++){

                if(arrayNotes[j].className == "notefafasostenido" || arrayNotes[j].className == "notefasolbemol"){

                    document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                    arrayNotes.splice(j,1);
                    score=score+5;
                    document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                    if(remainingNotes == 0 && arrayNotes.length == 0){
                        endGame();
                    }
                    return;
                }
            }

        } else if(composedkey == "notefaespecial_04"){

            for(var j = 0; j < arrayNotes.length; j++){

                if(arrayNotes[j].className == "notefasolsostenido" || arrayNotes[j].className == "notefalabemol"){

                    document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                    arrayNotes.splice(j,1);
                    score=score+5;
                    document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                    if(remainingNotes == 0 && arrayNotes.length == 0){
                        endGame();
                    }
                    return;
                }
            }

        } else if(composedkey == "notefaespecial_05"){

            for(var j = 0; j < arrayNotes.length; j++){

                if(arrayNotes[j].className == "notefalasostenido" || arrayNotes[j].className == "notefasibemol"){

                    document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                    arrayNotes.splice(j,1);
                    score=score+5;
                    document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                    if(remainingNotes == 0 && arrayNotes.length == 0){
                        endGame();
                    }
                    return;
                }
            }

        } else if(composedkey == "notesolespecial_01"){

            for(var j = 0; j < arrayNotes.length; j++){

                if(arrayNotes[j].className == "notesoldosostenido" || arrayNotes[j].className == "notesolrebemol"){

                    document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                    arrayNotes.splice(j,1);
                    score=score+5;
                    document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();

                        if(remainingNotes == 0 && arrayNotes.length == 0){
                            endGame();
                        }

                    return;
                }
            }

    } else if(composedkey == "notesolespecial_02"){

        for(var j = 0; j < arrayNotes.length; j++){

            if(arrayNotes[j].className == "notesolresostenido" || arrayNotes[j].className == "notesolmibemol"){

                document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                arrayNotes.splice(j,1);
                score=score+5;
                document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                if(remainingNotes == 0 && arrayNotes.length == 0){
                    endGame();
                }
                return;
            }
        }

    } else if(composedkey == "notesolespecial_03"){

        for(var j = 0; j < arrayNotes.length; j++){

            if(arrayNotes[j].className == "notesolfasostenido" || arrayNotes[j].className == "notesolsolbemol"){

                document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                arrayNotes.splice(j,1);
                score=score+5;
                document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                if(remainingNotes == 0 && arrayNotes.length == 0){
                    endGame();
                }
                return;
            }
        }

    } else if(composedkey == "notesolespecial_04"){

        for(var j = 0; j < arrayNotes.length; j++){

            if(arrayNotes[j].className == "notesolsolsostenido" || arrayNotes[j].className == "notesollabemol"){

                document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                arrayNotes.splice(j,1);
                score=score+5;
                document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                if(remainingNotes == 0 && arrayNotes.length == 0){
                    endGame();
                }
                return;
            }
        }

    } else if(composedkey == "notesolespecial_05"){

        for(var j = 0; j < arrayNotes.length; j++){

            if(arrayNotes[j].className == "notesollasostenido" || arrayNotes[j].className == "notesolsibemol"){

                document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                arrayNotes.splice(j,1);
                score=score+5;
                document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                if(remainingNotes == 0 && arrayNotes.length == 0){
                    endGame();
                }
                return;
            }
        }

    } else if(composedkey == "notecentral"){

        for(var j = 0; j < arrayNotes.length; j++){

            if(arrayNotes[j].className == "notesoldo" || arrayNotes[j].className == "notefadoalto"){

                document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                arrayNotes.splice(j,1);
                score=score+5;
                document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                if(remainingNotes == 0 && arrayNotes.length == 0){
                    endGame();
                }
                return;
            }
        }

    } else {

        for(var j = 0; j < arrayNotes.length; j++){

            if(arrayNotes[j].className == composedkey){

                document.getElementById("Game").removeChild(document.getElementById(arrayNotes[j].id));
                arrayNotes.splice(j,1);
                score=score+5;
                document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();
                if(remainingNotes == 0 && arrayNotes.length == 0){
                    endGame();
                }
                return;
            }
        }

    }

    score--;
    document.getElementById("scorescreen").innerHTML = "Score: " + score.toString();

    }
}
