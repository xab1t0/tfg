import requests
import os
import MySQLdb.cursors

from flask import Flask, jsonify

url = "http://127.0.0.1:5000/api"

def get_score_by_name():
    if 'loggedin' in session:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT username FROM alumn WHERE alumn_id = %s', [session['alumn_id']])
        score_username = cursor.fetchone()

        score = requests.get(url + "/score/" + score_username)
        result = score.json()

#def add_result():
