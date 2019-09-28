import os
from flask import Flask, render_template, request, redirect, url_for, flash, session, Blueprint
from musicgames import mysql
import MySQLdb.cursors
import re

teachers = Blueprint('teachers', __name__, template_folder='../templates/teacher/templates')

# Registro Porfesorado
@teachers.route('/register_t', methods=['GET', 'POST'])
def register_t():
    if request.method == 'POST' and 'fullname' in request.form and 'email' in request.form and 'username' in request.form and 'password' in request.form and 'dni' in request.form and 'phone' in request.form and 'gender' in request.form:
        # Crear un acceso facil para las variables
        username = request.form['username']
        password = request.form['password']
        fullname = request.form['fullname']
        dni = request.form['dni']
        email = request.form['email']
        phone = request.form['phone']
        gender = request.form['gender']
        # Chequea si la cuenta existe ya
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM teacher WHERE username = %s", [username])
        account = cursor.fetchone()
        # Si la cuenta existe muestra un error de validacion
        if account:
            flash('Cuenta ya existente, elija otro nombre de usuario', 'danger')
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            flash('Email no valido.', 'danger')
        elif not re.match(r'[A-Za-z0-9]+', username):
            flash('El numero de telefono solo debe contener numeros.', 'danger')
        elif not re.match(r'[0-9]+', phone):
            flash('El numero de telefono solo debe contener numeros.', 'danger')
        elif not username or not password or not fullname or not dni or not email or not phone or not gender:
            flash('Por favor, rellene el formulario.', 'danger')
        else:
            # Si la cuenta no existe y el form es valido, se agrega el nuevo profesor
            cursor.execute('INSERT INTO teacher (username, password, fullname, dni, email, phone, gender) VALUES (%s, %s, %s, %s, %s, %s, %s)', (username, password, fullname, dni, email, phone, gender))
            mysql.connection.commit()
            flash('Tu cuenta ha sido creada. Ahora puedes iniciar sesion', 'success')
            return redirect(url_for('teachers.login_t'))
    elif request.method == 'POST':
        flash('Por favor, rellene el formulario.', 'danger')
    return render_template('register_t.html', title='Registro')

# Acceso Profesorado
@teachers.route('/login_t/', methods=['GET', 'POST'])
def login_t():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM teacher WHERE username = %s AND password = %s', (username, password))
        account = cursor.fetchone()
        if account:
            # Crear sesion dato, podemos acceder a este dato por otras rutas
            session['loggedin'] = True
            session['teacher_id'] = account['teacher_id']
            session['username'] = account['username']
            # Se actualiza la fecha de cuando inicia sesion
            cursor.execute("""
            UPDATE teacher
            SET login_date = curdate()
            WHERE username = %s
            """, [username])
            mysql.connection.commit()
            # Redireccionamos al inicio
            return redirect(url_for('main.home_t'))
        else:
            # Si la cuenta no existe o usuario/clave son erroneos
            flash('Inicio de sesion fallido. Por favor, compruebe su usuario y clave', 'danger')
            return redirect(url_for('teachers.login_t'))
    return render_template('login_t.html', title='Acceso')

# Perfil Profesorado
@teachers.route('/teacher/profile')
def teacher_profile():
     # Chequeamos si esta logueado
    if 'loggedin' in session:
        # Necesitamos toda la informacion de la cuenta del profesor para poder mostrarla en la pagina de perfil
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM teacher WHERE teacher_id = %s', [session['teacher_id']])
        account = cursor.fetchone()
        # Profesorado logueado redirigir al perfil
        if account['gender'] == 'F':
            photo = url_for('static', filename='img/profile/teacher_female.png')
        else:
            photo = url_for('static', filename='img/profile/teacher_male.jpg')
        return render_template('profile_t.html', account=account, photo=photo, title="Mi Perfil")
    # Profesorado no esta logueado, redirigir al loguin
    return redirect(url_for('teachers.login_t'))

# Editar Profesorado
@teachers.route('/teacher/edit/<teacher_id>')
def edit_teacher(teacher_id):
    if 'loggedin' in session:
        # Buscamos al profesor por su id
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM teacher WHERE teacher_id = %s", [teacher_id])
        account = cursor.fetchone()
        return render_template('edit_t.html', teacher=account, title='Modificar datos')
    return redirect(url_for('teachers.login_t'))

# Actualizar Profesorado
@teachers.route('/update_t/<teacher_id>', methods=['POST'])
def update_teacher(teacher_id):
    if request.method == 'POST':
        username = request.form['username']
        fullname = request.form['fullname']
        email = request.form['email']
        phone = request.form['phone']
        # El profesor actualiza sus datos
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("""
        UPDATE teacher
        SET username = %s,
            fullname = %s,
            email = %s,
            phone = %s
            WHERE teacher_id = %s
            """, (username, fullname, email, phone, teacher_id))
        mysql.connection.commit()
        flash('Tus datos han sido actualizados correctamente.', 'success')
        return redirect(url_for('teachers.teacher_profile'))
    return render_template('edit_t.html', title='Modificar Datos')

@teachers.route('/teacher/logout')
def logout_t():
    # Eliminamos el dato de sesion, para que el profesor salga
   session.pop('loggedin', None)
   session.pop('id', None)
   session.pop('username', None)
   # Redireccionamos al inicio
   return redirect(url_for('main.inicio'))
