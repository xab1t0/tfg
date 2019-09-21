import os
from flask import Flask, render_template, request, redirect, url_for, flash, session, Blueprint, jsonify
from musicgames import mysql
import MySQLdb.cursors

api = Blueprint('api', __name__, template_folder='../templates/api/templates')

@api.route('/scores')
def scores():
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM scores")
        return 'OK'
