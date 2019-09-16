import os
from flask import Flask, render_template, request, redirect, url_for, flash, session, Blueprint
from musicgames import mysql
import MySQLdb.cursors

main = Blueprint('main', __name__, template_folder='../templates/main/templates')

# Inicio
@main.route('/')
def inicio():
    return render_template('inicio.html', title='Inicio')

# Inicio No Registrados
@main.route('/index')
def index():
    return render_template('index.html', title='Inicio')

# Juegos
@main.route('/games')
def games():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM game")
    account = cursor.fetchall()
    mysql.connection.commit()
    return render_template('games.html', title='Juegos', games=account)

# Inicio Alumnado
@main.route('/alumn')
def home():
    # Chequear si esta logueado
    if 'loggedin' in session:
        # Alumno logueado redirigir al inicio
        return render_template('index_a.html', username=session['username'], title=session['username'])
    # Alumno no esta logueado, redirigir al loguin
    return redirect(url_for('alumns.login_a'))

# Acceso Privado Profesorado
@main.route('/academy')
def teacher_pass():
    return render_template('academy.html', title='Profesorado')

# Permiso Denegado
@main.route('/not_permit')
def not_permit():
    return render_template('denegado.html', title='No Permitido')

# Incio Profesorado
@main.route('/teacher')
def home_t():
    # Chequear si esta logueado
    if 'loggedin' in session:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("""
        SELECT grupo.name, grupo.grupo_id, grupo.classroom, teacher.fullname
        FROM teacher
        INNER JOIN grupoteacher ON teacher.teacher_id = grupoteacher.id_teacher
        INNER JOIN grupo ON grupoteacher.name_grupo = grupo.name""")
        account = cursor.fetchall()
        return render_template('index_t.html', manages=account, title=session['username'])
    # Profesorado no esta logueado, redirigir al loguin
    return redirect(url_for('teachers.login_t'))

# Calendario -------------------------------------------------------------------
@main.route('/teacher/calendar')
def calendar_t():
    return render_template('calendar_t.html', title='Calendario')

@main.route('/alumn/calendar')
def calendar_a():
    return render_template('calendar_a.html', title='Calendario')

@main.route('/calendar')
def calendar():
    return render_template('calendar.html', title='Calendario')

# Quienes somos ----------------------------------------------------------------
@main.route('/about')
def about_us():
    return render_template('about_us.html', title='Equipo')

@main.route('/alumn/about')
def about_us_a():
    return render_template('about_us_a.html', title='Equipo')

@main.route('/teacher/about')
def about_us_t():
    return render_template('about_us_t.html', title='Equipo')

# Contacto ---------------------------------------------------------------------
@main.route('/contact')
def contact():
    return render_template('contact.html', title='Contacto')

@main.route('/alumn/contact')
def contact_a():
    return render_template('contact_a.html', title='Contacto')

@main.route('/teacher/contact')
def contact_t():
    return render_template('contact_t.html', title='Contacto')

"""@main.route('/thanks')
def thanks():
    return render_template('thanks.html', title='Gracias')"""

# Noticias ---------------------------------------------------------------------
"""@main.route('/news')
def news():
    return render_template('news.html')"""
