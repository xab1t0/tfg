import os
from flask import Flask, render_template, request, redirect, url_for, flash, session, Blueprint
from musicgames import mysql
import MySQLdb.cursors

juego = Blueprint('juego', __name__, template_folder='../game')

# Juegos
@juego.route('/game')
def index_game():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM game")
    account = cursor.fetchall()
    return render_template('games.html', title='Juegos', games=account)

# Jugar Juego
@juego.route('/game/<game_id>')
def play_game(game_id):
    if game_id == "1":
        return render_template('game1/index.html')
    elif game_id == "2":
        return render_template('game2/PInicio.html')
    elif game_id == "3":
        return render_template('game3/Pinicio.html')

@juego.route('/game/2')
def index_game2():
    return render_template('game2/PInicio.html')

@juego.route('/game/3')
def index_game3():
    return render_template('game3/PInicio.html')

@juego.route('/game/2/levels')
def level_game2():
    return render_template('game2/Niveles.html')

@juego.route('/game/3/levels')
def level_game3():
    return render_template('game3/Niveles.html')

@juego.route('/game/2/level')
def lvl_game2():
    return render_template('game2/nivelgene.html')

@juego.route('/game/3/level')
def lvl_game3():
    return render_template('game3/nivelgene.html')

@juego.route('/game/2/gameover')
def gameover2():
    return render_template('game2/gameover.html')

@juego.route('/game/3/gameover')
def gameover3():
    return render_template('game3/gameover.html')
