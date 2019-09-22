class GameManager {
    constructor(configuration) {
        this.conf = configuration;
        this.iCorazon = 1;
        this.iteracion = 0;
        this.familia = [];
        this.contadorFallos = 0;
        this.contadorAciertos = 0;
        this.intentos = 0;
        this.volver = document.getElementById("volver");
        this.numeroNivel = 1;
        this.scoretext = 0;
        this.currentLevel = 0;
        this.indicadorNivel = document.getElementById("level");
        this.score = document.getElementById("contador");
        this.level = 0;
        this.viento = ["../../static/game3/css/oboe.svg","../../static/game3/css/clarinete.svg","../../static/game3/css/saxofon.svg","../../static/game3/css/flauta.svg","../../static/game3/css/organo.svg","../../static/game3/css/tuba.svg","../../static/game3/css/trombon.svg","../../static/game3/css/trompeta.svg"];
        this.cuerda = ["../../static/game3/css/viola.svg","../../static/game3/css/cello.svg","../../static/game3/css/violin.svg","../../static/game3/css/contrabajo.svg","../../static/game3/css/piano.svg","../../static/game3/css/lyra.svg","../../static/game3/css/arpa.svg","../../static/game3/css/banjo.svg","../../static/game3/css/guitarra.svg"];
        this.percusion = ["../../static/game3/css/xilofono.svg","../../static/game3/css/tubulares.svg","../../static/game3/css/maracas.svg","../../static/game3/css/triangulo.svg","../../static/game3/css/bateria.svg","../../static/game3/css/bombo.svg","../../static/game3/css/pandereta.svg","../../static/game3/css/platillos.svg","../../static/game3/css/tambor.svg",];
        this.cuerdaFrotadaSRC = ["../../static/game3/css/viola.svg","../../static/game3/css/cello.svg","../../static/game3/css/violin.svg","../../static/game3/css/contrabajo.svg"];
        this.cuerdaPercutidaSRC = ["../../static/game3/css/piano.svg"];
        this.cuerdaPulsadaSRC = ["../../static/game3/css/lyra.svg","../../static/game3/css/arpa.svg","../../static/game3/css/banjo.svg","../../static/game3/css/guitarra.svg"];
        this.percusionDeterminadaSRC = ["../../static/game3/css/xilofono.svg","../../static/game3/css/tubulares.svg"];
        this.percusionIndeterminadaSRC = ["../../static/game3/css/maracas.svg","../../static/game3/css/triangulo.svg","../../static/game3/css/bateria.svg","../../static/game3/css/bombo.svg","../../static/game3/css/pandereta.svg","../../static/game3/css/platillos.svg","../../static/game3/css/tambor.svg"];
        this.vientoMaderaSRC = ["../../static/game3/css/oboe.svg","../../static/game3/css/clarinete.svg","../../static/game3/css/saxofon.svg","../../static/game3/css/flauta.svg"];
        this.vientoMetalSRC = ["../../static/game3/css/organo.svg","../../static/game3/css/tuba.svg","../../static/game3/css/trombon.svg","../../static/game3/css/trompeta.svg"];
        this.tipo = [this.viento,this.cuerda,this.percusion,this.cuerdaFrotadaSRC,this.cuerdaPercutidaSRC,this.cuerdaPulsadaSRC,this.percusionDeterminadaSRC,this.percusionIndeterminadaSRC,this.vientoMaderaSRC,this.vientoMetalSRC];
        this.instrumentoFam = [];
        this.instrumentoThief = [];
        this.instrumentoSolucion = [];
    }

    initLevel(level) {
        this.currentLevel = parseInt(level);
        this.numeroNivel = parseInt(level);
        this.indicadorNivel.innerHTML = "<h2 align=center>Nivel: " + this.numeroNivel + "</h2>";
        this.clearLevel();
        this.initResult();
        this.initThief();
        this.generateSolution();
        this.drawArrayInstrument("zonaInstrumentos",this.instrumentoSolucion);
        tempo();
        if(this.iCorazon > 1)
        {
            for(var x=1;x<this.iCorazon;x++)
            {
                var vidas = document.getElementById("corazon" + x);
                vidas.style.display = "block";
            }
        }
        this.iCorazon = 1;
    }

    resetLevel() {
        this.clearLevel();
        this.drawArrayInstrument("zonaInstrumentos",this.instrumentoSolucion);
    }

    //Inicializa el número de instrumentos
    initResult() {
        var elegirTipo = 0;
        this.instrumentoFam = [];
        var arrayOfInstrumentsToFamily = [];

        elegirTipo = Math.round(Math.random() * ((this.conf[this.currentLevel-1][2]) - (this.conf[this.currentLevel-1][3])) + (this.conf[this.currentLevel-1][3]));
        for (var i = 0; i < this.conf[this.currentLevel-1][0]; i++) {
            if(this.tipo[elegirTipo].length > 2)
            {
                var aleatorio = this.tipo[elegirTipo][Math.round(Math.random() * (this.tipo[elegirTipo].length - 1))];
                if(arrayOfInstrumentsToFamily.indexOf(aleatorio) == -1)
                {
                    arrayOfInstrumentsToFamily.push(aleatorio);
                }
                else
                    i--;
            }
            else
            {
                i--;
                elegirTipo = Math.round(Math.random() * (this.conf[this.currentLevel-1][2] - this.conf[this.currentLevel-1][3]) + this.conf[this.currentLevel-1][3]);
            }
        }

        this.familia = this.tipo[elegirTipo];
        this.instrumentoFam = arrayOfInstrumentsToFamily;

    }

    initThief()
    {
        var elegirTipo = 0;
        this.instrumentoThief = [];
        var arrayOfInstrumentsToThief = [];

        elegirTipo = Math.round(Math.random() * (this.conf[this.currentLevel-1][4] - this.conf[this.currentLevel-1][5]) + this.conf[this.currentLevel-1][5]);
        for(var i=0;i<this.conf[this.currentLevel-1][1];i++)
        {
            var aleatorio = this.tipo[elegirTipo][Math.round(Math.random() * (this.tipo[elegirTipo].length - 1))];
            if(this.instrumentoFam.indexOf(aleatorio) != -1 || this.familia.indexOf(aleatorio) != -1)
            {
                while(this.familia.indexOf(aleatorio) != -1 || this.instrumentoFam.indexOf(aleatorio) != -1)
                {
                    elegirTipo = Math.round(Math.random() * (this.conf[this.currentLevel-1][4] - this.conf[this.currentLevel-1][5]) + this.conf[this.currentLevel-1][5]);
                    var aleatorio = this.tipo[elegirTipo][Math.round(Math.random() * (this.tipo[elegirTipo].length - 1))];
                }

                if(arrayOfInstrumentsToThief.indexOf(aleatorio) == -1 && this.instrumentoFam.indexOf(aleatorio) == -1)
                {
                    arrayOfInstrumentsToThief.push(aleatorio);
                }
                else
                     i--;
            }
            else{
                if(arrayOfInstrumentsToThief.indexOf(aleatorio) == -1 && this.instrumentoFam.indexOf(aleatorio) == -1)
                {
                    arrayOfInstrumentsToThief.push(aleatorio);
                }
                else
                {
                    elegirTipo = Math.round(Math.random() * (this.conf[this.currentLevel-1][4] - this.conf[this.currentLevel-1][5]) + this.conf[this.currentLevel-1][5]);
                    i--;
                }
            }
        }
        this.instrumentoThief = arrayOfInstrumentsToThief;
    }

    generateSolution() {
        for(var i=0;i< this.instrumentoThief.length;i++)
        {
            this.instrumentoFam.push(this.instrumentoThief[i]);
        }
        this.instrumentoFam.sort(() => Math.random() - 0.5);
        this.instrumentoSolucion = this.instrumentoFam;
    }

    //Limpia todas las zonas sin dejar elementos
    clearLevel() {
        var instrumentos = document.getElementById("zonaInstrumentos");

        if (instrumentos.hasChildNodes()) {
            while (instrumentos.childNodes.length >= 1) {
                instrumentos.removeChild(instrumentos.firstChild);
            }
        }
    }

    comprobarSolucion(element) {

        var tiempo = document.getElementById("segundos");
        var parent = element.parentNode;
        if(this.instrumentoThief.indexOf(parent.firstChild.getAttribute("src")) >= 0 && tiempo.innerHTML > 0)
        {
            this.contadorAciertos++;
            parent.style.backgroundColor = "aquamarine";
            if(this.contadorAciertos == this.instrumentoThief.length)
            {
                this.intentos = 0;
                this.contadorAciertos = 0;
                if(tiempo.innerHTML > 10 )
                    this.scoretext += 15;
                else
                    this.scoretext += 10;
                this.score.innerHTML = "<h2>Score: " + this.scoretext + "</h2>";
                this.iteracion++;
                parar();
                setTimeout('timeCero()',2000);

                if(this.iteracion == 5)
                {
                    this.intentos = 0;
                    this.currentLevel = parseInt(this.currentLevel) + 1;
                    this.iteracion = 0;
                    this.numeroNivel += 1;
                }
                this.indicadorNivel.innerHTML = "<h2 align=center>Nivel: " + this.numeroNivel + "</h2>";
                window.setTimeout(function() {
                    mng.initLevel(parseInt(mng.currentLevel));
                },2000);

            }
        }
        else{
            var vidas = document.getElementById("corazon" + this.iCorazon);
            parent.style.backgroundColor = "indianred";
            this.contadorFallos++;

            if(this.contadorFallos == (this.instrumentoFam.length - this.instrumentoThief.length))
            {
                this.contadorFallos = 0;
                this.intentos++;
                vidas.style.display = "none";
                this.iCorazon++;
                setTimeout('mng.resetLevel()',1000);

                if(this.intentos == 3)
                {
                    this.iCorazon=1;
                    location.href="{{ url_for('juego.gameover3') }}";
                    this.intentos = 0;
                }
            }
        }
    }

    fallaTiempo()
    {
        var tiempo = document.getElementById("segundos");
        var vidas = document.getElementById("corazon" + this.iCorazon);
        if(tiempo.innerHTML == 0)
        {
            vidas.style.display = "none";
            this.iCorazon++;
            this.intentos++;
        }
        if(this.intentos == 3)
        {
            this.iCorazon=1;
            location.href="{{ url_for('juego.gameover3') }}";
            this.intentos = 0;
        }
    }

    drawArrayInstrument(padre,arraySolucion) {
        var divPadre = document.getElementById(padre);
        for (var i = 0; i < arraySolucion.length; i++) {
            //setea el atributo nombre de clase de cada instrumento
            var nuevaDiv = document.createElement("div");
            var atributo = document.createAttribute("id");

            atributo.value = "instrumento";
            nuevaDiv.setAttributeNode(atributo);

            //setea el atributo de la imagen para cada instrumento
            var imagen = document.createElement("img");
            var funcion = document.createAttribute("onclick");
            var fuente = document.createAttribute("src");

            divPadre.appendChild(nuevaDiv);
            fuente.value = arraySolucion[i];
            funcion.value = "mng.comprobarSolucion(this);";
            imagen.setAttributeNode(funcion);
            imagen.setAttributeNode(fuente);
            nuevaDiv.appendChild(imagen);
        }
    }
}
