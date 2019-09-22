movimiento();
class GameManager {
    constructor(configuration) {
        this.conf = configuration;
        this.iCorazon = 1;
        this.iteracion = 0;
        this.intentos = 0;
        this.volver = document.getElementById("volver");
        this.numeroNivel = 1;
        this.fallo = 0;
        this.scoretext = 0;
        this.currentLevel = 0;
        this.indicadorNivel = document.getElementById("level");
        this.score = document.getElementById("contador");
        this.level = 0;
        this.svgSRC = ["../../static/game2/css/redonda.svg", "../../static/game2/css/redondaPunt.svg", "../../static/game2/css/blanca.svg", "../../static/game2/css/blancaPunt.svg", "../../static/game2/css/negra.svg", "../../static/game2/css/negraPunt.svg", "../../static/game2/css/corchea.svg", "../../static/game2/css/corcheaPunt.svg", "../../static/game2/css/semicorchea.svg", "../../static/game2/css/semicorcheaPunt.svg", "../../static/game2/css/fusa.svg", "../../static/game2/css/fusaPunt.svg", "../../static/game2/css/semifusa.svg", "../../static/game2/css/semifusaPunt.svg"];
        this.noteValue = ["400000", "600000", "200000", "300000", "100000", "150000", "50000", "75000", "25000", "37500", "12500", "18750", "6250", "93750"];
        this.equivalence = [];
        this.solution = [];
        this.pieces = [];
    }

    initLevel(level) {
        this.currentLevel = level;
        this.numeroNivel = parseInt(level);
        this.indicadorNivel.innerHTML = "<h2 align=center>Nivel: " + this.numeroNivel + "</h2>";
        this.clearLevel();
        this.initResult();
        this.generateSolutions();
        this.generatePieces(this.currentLevel);
        this.drawArrayNote("result", this.equivalence, false);
        this.drawArrayNote("piezas", this.pieces, true);
        tempo();
        if (this.iCorazon > 1) {
            for (var x = 1; x < this.iCorazon; x++) {
                var vidas = document.getElementById("corazon" + x);
                vidas.style.display = "block";
            }
        }
        this.iCorazon = 1;
    }

    resetLevel() {
        this.clearLevel();
        zonas(this.solution.length);
        this.drawArrayNote("result", this.equivalence, false);
        this.drawArrayNote("piezas", this.pieces, true);
        var parent = document.getElementById("proof");
        for(var i=0;i<parent.childNodes.length-1;i++)
        {
            var child = document.getElementById("zona-" + i);
            child.style.backgroundColor = "#ccc";
        }
    }

    generatePieces(currentLevel) {
        currentLevel = parseInt(currentLevel);

        //Añadimos las piezas de la solucion al array de piezas
        for (var i = 0; i < this.solution.length; i++) {
            this.pieces.push(this.solution[i]);
        }
        //Añadir piezas adicionales.
        //Las piezas adicionales se añadirán en base al currentlvl, siendo un porcentaje del numero de piezas que componen
        //la solucion con un mínimo de 2

        for (var i = 0; i < this.conf[this.currentLevel-1][0]; i++)
        {
                this.pieces.push(Math.round(Math.random() * (this.conf[this.currentLevel-1][2] - 1)));
        }

        //Se desordena las piezas para no pintarlas en orden
        this.pieces = this.pieces.sort(function () { return Math.random() - 0.5 });
    }


    //Inicializa el número de notas y las mismas para el acertijo
    initResult() {
        this.equivalence = [];
        var arrayOfNotesToEquivalence = [];

        for (var i = 0; i < this.conf[this.currentLevel-1][1]; i++) {
            arrayOfNotesToEquivalence.push(Math.round(Math.random() * (this.conf[this.currentLevel-1][2] - 1)));
        }

        this.equivalence = arrayOfNotesToEquivalence;
    }


    //Limpia todas las zonas sin dejar elementos
    clearLevel() {
        var proof = document.getElementById("proof");
        var result = document.getElementById("result");
        var piezas = document.getElementById("piezas");
        if (result.hasChildNodes() || piezas.hasChildNodes() || proof.hasChildNodes()) {
            while (result.childNodes.length >= 1) {
                result.removeChild(result.firstChild);
            }
            while (piezas.childNodes.length >= 1) {
                piezas.removeChild(piezas.firstChild);
            }
            while (proof.childNodes.length >= 1) {
                proof.removeChild(proof.firstChild);
            }
        }

        for(var i=0;i<proof.childNodes.length-1;i++)
        {
            var child = document.getElementById("zona-" + i);
            child.style.backgroundColor = "#ccc";
        }
    }

    drawArrayNote(padre, arraySolucion, draggable) {
        var divPadre = document.getElementById(padre);
        for (var i = 0; i < arraySolucion.length; i++) {
            //setea el atributo nombre de clase y draggable de canada una de las notas
            var nuevaDiv = document.createElement("div");
            var atributo = document.createAttribute("class");
            var atributo2 = document.createAttribute("draggable");

            atributo.value = "nota";
            atributo2.value = draggable;
            nuevaDiv.setAttributeNode(atributo2);
            nuevaDiv.setAttributeNode(atributo);

            //setea el atributo de la imagen para los div y el del valor de cada nota
            var imagen = document.createElement("img");
            var fuente = document.createAttribute("src");
            var atr = document.createAttribute("data.indice");

            divPadre.appendChild(nuevaDiv);
            fuente.value = this.svgSRC[arraySolucion[i]];
            atr.value = arraySolucion[i];
            imagen.setAttributeNode(fuente);
            imagen.setAttributeNode(atr);
            nuevaDiv.appendChild(imagen);
        }
    }

    generateSolutions() {
        do {
            do {
                var generarNuevaEquivalencia = false;
                var total = this.getValueNotes(this.equivalence);
                var allSolution = [];
                var combinatoria = [];
                var valueCombinatoria = 0;
                //Soluciones de 1 sola nota
                for (var i = 0; i < this.noteValue.length; i++) {
                    combinatoria = [i];
                    valueCombinatoria = this.getValueNotes(combinatoria);
                    if (valueCombinatoria == total && this.noteValue[i] >= 50000) {
                        allSolution.push(combinatoria);
                    }
                }
                //Soluciones de 2 notas
                for (var i = 0; i < this.noteValue.length; i++) {
                    for (var j = 0; j < this.noteValue.length; j++) {
                        combinatoria = [i, j];
                        valueCombinatoria = this.getValueNotes(combinatoria);
                        if (valueCombinatoria == total && !(this.noteValue[i] < 50000 || this.noteValue[j] < 50000)) {
                            allSolution.push(combinatoria);
                        }
                    }
                }
                //Soluciones de 3 notas
                for (var i = 0; i < this.noteValue.length; i++) {
                    for (var j = 0; j < this.noteValue.length; j++) {
                        for (var k = 0; k < this.noteValue.length; k++) {
                            combinatoria = [i, j, k];
                            valueCombinatoria = this.getValueNotes(combinatoria);
                            if (valueCombinatoria == total && !(this.noteValue[i] < 50000 || this.noteValue[j] < 50000 || this.noteValue[k] < 50000)) {
                                allSolution.push(combinatoria);
                            }
                        }
                    }
                }

                if (this.currentLevel >= 5) {
                    //Soluciones de 4 notas
                    for (var i = 0; i < this.noteValue.length; i++) {
                        for (var j = 0; j < this.noteValue.length; j++) {
                            for (var k = 0; k < this.noteValue.length; k++) {
                                for (var l = 0; l < this.noteValue.length; l++) {
                                    combinatoria = [i, j, k, l];
                                    valueCombinatoria = this.getValueNotes(combinatoria);
                                    if (valueCombinatoria == total) {
                                        allSolution.push(combinatoria);
                                    }
                                }
                            }
                        }
                    }
                    if (this.currentLevel >= 7) {
                        //Soluciones de 5 notas
                        for (var i = 0; i < this.noteValue.length; i++) {
                            for (var j = 0; j < this.noteValue.length; j++) {
                                for (var k = 0; k < this.noteValue.length; k++) {
                                    for (var l = 0; l < this.noteValue.length; l++) {
                                        for (var m = 0; m < this.noteValue.length; m++) {
                                            combinatoria = [i, j, k, l, m];
                                            valueCombinatoria = this.getValueNotes(combinatoria);
                                            if (valueCombinatoria == total) {
                                                allSolution.push(combinatoria);
                                            }
                                        }

                                    }
                                }
                            }
                        }
                    }
                    if (this.currentLevel >= 9) {
                        //Soluciones de 6 notas
                        for (var i = 0; i < this.noteValue.length; i++) {
                            for (var j = 0; j < this.noteValue.length; j++) {
                                for (var k = 0; k < this.noteValue.length; k++) {
                                    for (var l = 0; l < this.noteValue.length; l++) {
                                        for (var m = 0; m < this.noteValue.length; m++) {
                                            for (var n = 0; n < this.noteValue.length; n++) {
                                                combinatoria = [i, j, k, l, m, n];
                                                valueCombinatoria = this.getValueNotes(combinatoria);
                                                if (valueCombinatoria == total) {
                                                    allSolution.push(combinatoria);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (allSolution.length == 0) {
                    generarNuevaEquivalencia = true;
                    this.initResult();
                }

            } while (generarNuevaEquivalencia)



            this.solution = allSolution[parseInt(Math.round(Math.random() * (allSolution.length - 1)))];
        } while (this.compareArrayEquals(this.solution, this.equivalence));
        zonas(this.solution.length);
    }

    getValueNotes(arrayNotes) {
        var value = 0;
        for (var i = 0; i < arrayNotes.length; i++) {
            value += parseFloat(this.noteValue[arrayNotes[i]]);
        }
        return value;
    }

    compareArrayEquals(array1, array2) {
        if (array1.length != array2.length) {
            return false
        } else {
            var aux1 = array1.sort(function (a, b) { return a - b });
            var aux2 = array2.sort(function (a, b) { return a - b });
            for (var i = 0; i < array1.length; i++) {
                if (aux1[i] != aux2[i]) {
                    return false
                }
            }
        }
        return true;
    }

    comprobarSolucion() {
        var arrayProof = [];
        for (var i = 0; i < this.solution.length; i++) {
            var zona = document.getElementById("zona-" + i).childNodes[0];
            if (zona) {
                arrayProof.push(zona.getAttribute('data.indice'));
            }
            if (this.compareArrayEquals(this.solution, arrayProof) == false) {
                this.fallo++;
            }
        }

        if (this.compareArrayEquals(this.solution, arrayProof) == true) {
            var parent = document.getElementById("proof");

            for(var i=0;i<parent.childNodes.length-1;i++)
            {
                var child = document.getElementById("zona-" + i);
                child.style.backgroundColor = "aquamarine";
            }

            var tiempo = document.getElementById("segundos");
            this.fallo = 0;

            if (tiempo.innerHTML > 10)
                this.scoretext += 15;
            else
                this.scoretext += 10;

            this.score.innerHTML = "<h2>Score: " + this.scoretext + "</h2>";
            this.iteracion++;
            parar();
            setTimeout('timeCero()', 2000);

            if (this.iteracion == 5) {
                this.intentos = 0;
                this.currentLevel = parseInt(this.currentLevel) + 1;
                this.iteracion = 0;
                this.numeroNivel += 1;
            }

            this.pieces = [];
            this.indicadorNivel.innerHTML = "<h2 align=center>Nivel: " + this.numeroNivel + "</h2>";
            this.intentos = 0;

            window.setTimeout(function () {
                mng.initLevel(parseInt(mng.currentLevel));
            }, 2000);

        }

        else if (this.fallo == (this.solution.length * this.solution.length)) {
            var parent = document.getElementById("proof");

            for(var i=0;i<parent.childNodes.length-1;i++)
            {
                var child = document.getElementById("zona-" + i);
                child.style.backgroundColor = "indianred";
            }

            var vidas = document.getElementById("corazon" + this.iCorazon);
            this.fallo = 0;
            this.intentos++;
            vidas.style.display = "none";
            this.iCorazon++;
            setTimeout('mng.resetLevel()', 1000);

            if (this.intentos == 3) {
                this.iCorazon = 1;
                location.href = "{{ url_for('juego.gameover2') }}";
                this.intentos = 0;
            }
        }
    }
    fallaTiempo() {
        var tiempo = document.getElementById("segundos");
        var vidas = document.getElementById("corazon" + this.iCorazon);
        if (tiempo.innerHTML == 0) {
            vidas.style.display = "none";
            this.iCorazon++;
            this.intentos++
        }
        if (this.intentos == 3) {
            this.iCorazon = 1;
            location.href = "{{ url_for('juego.gameover2') }}";
            this.intentos = 0;
        }
    }
}
