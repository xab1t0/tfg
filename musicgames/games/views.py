import os
from flask import Flask, render_template, request, redirect, url_for, flash, session, Blueprint
from musicgames import mysql
import MySQLdb.cursors

juego = Blueprint('juego', __name__, template_folder='../game')

# Juegos
@juego.route('/game')
def index_game():
    # Se muestran todos los juegos disponibles
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM game")
    account = cursor.fetchall()
    return render_template('games.html', title='Juegos', games=account)

# Jugar Juego
@juego.route('/game/<game_id>')
def play_game(game_id):
    # Se accede a cada juego por su id
    if game_id == "1":
        return render_template('game1/user/index.html')
    elif game_id == "2":
        return render_template('game2/user/PInicio.html')
    elif game_id == "3":
        return render_template('game3/user/Pinicio.html')

@juego.route('/game/2')
def index_game2():
    # Redireccionamos a la pag de inicio
    return render_template('game2/user/PInicio.html')

@juego.route('/game/3')
def index_game3():
    # Redireccionamos a la pag de inicio
    return render_template('game3/user/PInicio.html')

@juego.route('/game/2/levels')
def level_game2():
    # Redireccionamos a la pag de niveles
    return render_template('game2/user/Niveles.html')

@juego.route('/game/3/levels')
def level_game3():
    # Redireccionamos a la pag de niveles
    return render_template('game3/user/Niveles.html')

@juego.route('/game/2/level')
def lvl_game2():
    return render_template('game2/user/nivelgene.html')

@juego.route('/game/3/level')
def lvl_game3():
    return render_template('game3/user/nivelgene.html')

@juego.route('/game/2/gameover')
def gameover2():
    # Redireccionamos a la pag de fin de juego
    return render_template('game2/user/gameover.html')

@juego.route('/game/3/gameover')
def gameover3():
    # Redireccionamos a la pag de fin de juego
    return render_template('game3/user/gameover.html')

# -----------------------------------------------------------------------------
