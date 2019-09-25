import os
from flask import Flask, render_template, request, redirect, url_for, flash, session, Blueprint
from flask import jsonify
from musicgames import mysql
import MySQLdb.cursors
import re

alumns = Blueprint('alumns', __name__, template_folder='../templates/alumn/templates')

# Registrar Alumnado
@alumns.route('/register_a', methods=['GET', 'POST'])
def register_a():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'fullname' in request.form and 'birth_date' in request.form and 'email' in request.form and 'avatar' in request.form:
        # Crear un acceso facil para las variables
        username = request.form['username']
        password = request.form['password']
        fullname = request.form['fullname']
        birth_date = request.form['birth_date']
        email = request.form['email']
        avatar = request.form['avatar']
        # Comprueba si la cuenta existe ya
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM alumn WHERE username = %s", [username])
        account = cursor.fetchone()
        # Si la cuenta existe muestra un error de validacion
        if account:
            flash('Cuenta ya existente, elija otro nombre de usuario', 'danger')
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            flash('Email no valido', 'danger')
        elif not re.match(r'[A-Za-z0-9]+', username):
            flash('Nombre de usuario, debe contener numeros y/o letras', 'danger')
        elif not username or not password or not fullname or not email or not birth_date:
            flash('Por favor, rellene el formulario', 'danger')
        else:
            # Si la cuenta no existe y el form es valido, se agrega el nuevo alumno
            cursor.execute("""
            INSERT INTO alumn (username, password, fullname, birth_date, email, avatar)
            VALUES (%s, %s, %s, %s, %s, %s)""",
            (username, password, fullname, birth_date, email, avatar))
            mysql.connection.commit()
            flash('Tu cuenta ha sido creada. Ahora puedes iniciar sesion', 'success')
            return redirect(url_for('alumns.login_a'))
    elif request.method == 'POST':
        flash('Por favor, rellene todo el formulario', 'danger')
    return render_template('register_a.html', title='Registro')

# Acceso Alumnado
@alumns.route('/login_a/', methods=['GET', 'POST'])
def login_a():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM alumn WHERE username = %s AND password = %s', (username, password))
        account = cursor.fetchone()
        if account:
            # Crear sesion dato, podemos acceder a este dato por otras rutas
            session['loggedin'] = True
            session['alumn_id'] = account['alumn_id']
            session['username'] = account['username']
            # Se actualiza la fecha cuando inicia sesion
            cursor.execute("""
            UPDATE alumn
            SET login_date = curdate()
            WHERE username = %s
            """, [username])
            mysql.connection.commit()
            # Redireccionamos al inicio
            return redirect(url_for('main.home'))
        else:
            # Account doesnt exist or username/password incorrect
            flash('Inicio de sesion fallido. Por favor, compruebe su usuario y clave', 'danger')
            return redirect(url_for('alumns.login_a'))
    return render_template('login_a.html', title='Acceso')

# Perfil Alumnado
@alumns.route('/alumn/profile')
def alumn_profile():
    if 'loggedin' in session:
        # Necesitamos toda la informacion de la cuenta del alumno para poder mostrarla en la pagina de perfil
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM alumn WHERE alumn_id = %s', [session['alumn_id']])
        account = cursor.fetchone()
        # Muestra el perfil si esta logueado
        if account['avatar'] == "1":
            avatar = url_for('static', filename='img/avatar/1.png')
        elif account['avatar'] == "2":
            avatar = url_for('static', filename='img/avatar/2.png')
        elif account['avatar'] == "3":
            avatar = url_for('static', filename='img/avatar/3.png')
        elif account['avatar'] == "4":
            avatar = url_for('static', filename='img/avatar/4.png')
        elif account['avatar'] == "5":
            avatar = url_for('static', filename='img/avatar/5.png')
        elif account['avatar'] == "6":
            avatar = url_for('static', filename='img/avatar/6.png')
        elif account['avatar'] == "7":
            avatar = url_for('static', filename='img/avatar/7.png')
        elif account['avatar'] == "8":
            avatar = url_for('static', filename='img/avatar/8.png')
        elif account['avatar'] == "9":
            avatar = url_for('static', filename='img/avatar/9.png')
        elif account['avatar'] == "10":
            avatar = url_for('static', filename='img/avatar/10.png')
        elif account['avatar'] == "11":
            avatar = url_for('static', filename='img/avatar/11.png')
        elif account['avatar'] == "12":
            avatar = url_for('static', filename='img/avatar/12.png')
        elif account['avatar'] == "13":
            avatar = url_for('static', filename='img/avatar/13.png')
        elif account['avatar'] == "14":
            avatar = url_for('static', filename='img/avatar/14.png')
        elif account['avatar'] == "15":
            avatar = url_for('static', filename='img/avatar/15.png')
        elif account['avatar'] == "16":
            avatar = url_for('static', filename='img/avatar/16.png')
        else:
            avatar = url_for('static', filename='img/avatar/default.png')
        return render_template('profile_a.html', account=account, foto=avatar, title='Mi Perfil')
    # Si no esta logueado, redirige al acceso
    return redirect(url_for('alumns.login_a'))

# Editar Alumnado
@alumns.route('/alumn/edit/<alumn_id>')
def edit_alumn(alumn_id):
    if 'loggedin' in session:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM alumn WHERE alumn_id = %s", [alumn_id])
        account = cursor.fetchone()
        return render_template('edit_a.html', alumno=account, title='Modificar Datos')
    return redirect(url_for('alumns.login_a'))

# Actualizar Alumnado
@alumns.route('/update/<alumn_id>', methods=['POST'])
def update_alumn(alumn_id):
    if request.method == 'POST':
        username = request.form['username']
        fullname = request.form['fullname']
        email = request.form['email']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("""
        UPDATE alumn
        SET username = %s,
            fullname = %s,
            email = %s
            WHERE alumn_id = %s
            """, (username, fullname, email, alumn_id))
        mysql.connection.commit()
        flash('Tus datos han sido actualizados correctamente.', 'success')
        return redirect(url_for('alumns.alumn_profile'))
    return render_template('edit_a.html', title='Modificar Datos')

# Selecciono elegir avatar
@alumns.route('/alumn/update/<alumn_id>')
def edit_avatar(alumn_id):
    if 'loggedin' in session:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM alumn WHERE alumn_id = %s", [alumn_id])
        account = cursor.fetchone()
        return render_template('avatar_a.html', alumno=account, title='Elegir Avatar')
    return redirect(url_for('alumns.login_a'))

# Subir Avatar
@alumns.route('/update/avatar/<alumn_id>', methods=['GET','POST'])
def update_avatar(alumn_id):
    if request.method == 'POST':
        avatar = request.form['avatar']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('UPDATE alumn SET avatar = %s WHERE alumn_id = %s', (avatar, alumn_id))
        mysql.connection.commit()
        flash('Tu avatar ha sido actualizado correctamente.', 'success')
        return redirect(url_for('alumns.alumn_profile'))
    return render_template('avatar_a.html', title='Elegir Avatar')

# -----------------------------------------------------------------
# Juegos Alumnado
@alumns.route('/alumn/games')
def alumn_games():
    if 'loggedin' in session:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM game")
        account = cursor.fetchall()
        return render_template('games_a.html', title='Juegos', juegos=account)
    return redirect(url_for('alumns.login_a'))

# Jugar Juego
@alumns.route('/alumn/game/<game_id>')
def play_gameA(game_id):
    if 'loggedin' in session:
        cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cur.execute("SELECT * FROM alumn WHERE username = %s", [session['username']])
        acc = cur.fetchone()
        if game_id == "1":
            return render_template('game1/alumn/index.html', alumn=acc)
        elif game_id == "2":
            return render_template('game2/alumn/PInicio.html')
        elif game_id == "3":
            return render_template('game3/alumn/PInicio.html')

# Resultados de Alumnado
@alumns.route('/alumn/results')
def alumn_results():
    return render_template('results_a.html', title='Mis Puntuaciones')

# Recibir Puntuaciones
@alumns.route('/alumn/api/results', methods=['POST'])
def add_result():
    if 'loggedin' in session:
        _name_game = request.json['name_game']
        _level = request.json['level']
        _points = request.json['score']

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        # cursor.execute("SELECT * FROM alumn WHERE alumn_id = %s", [session['alumn_id']])
        cursor.execute("""
        INSERT INTO result (name_game, level, points)
        VALUES (%s, %s, %s)""",
        (_name_game, _level, _points))
        mysql.connection.commit()

        return jsonify('Resultados recibidos correctamente')
        # cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        # cur.execute("SELECT result_id FROM result WHERE points = %s", [_points])
        # acc = cur.fetchone()

        #if acc:
        #    cur.execute('INSERT INTO resultalumn (id_teacher, name_grupo) VALUES (%s, %s)', (id_teacher, name))
        #    mysql.connection.commit()
# ---------------------------------------------------------------------------------------------------------------

# Logros Alumnado
@alumns.route('/alumn/logros')
def alumn_logros():
    if 'loggedin' in session:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT points_max FROM alumn WHERE alumn_id = %s", [session['alumn_id']])
        account = cursor.fetchone()
        print(account)
        return render_template('logros_a.html', title='Mis Logros', alumno=account)

# -----------------------------------------------------------------
# Salida Alumnado
@alumns.route('/logout')
def logout():
    # Eliminamos el dato de sesion, para que el usuario salga
   session.pop('loggedin', None)
   session.pop('id', None)
   session.pop('username', None)
   # Redireccionamos al inicio
   return redirect(url_for('main.inicio'))
