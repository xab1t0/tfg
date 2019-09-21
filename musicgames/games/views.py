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
        return render_template('game1/index.html', title='Juego 1')
