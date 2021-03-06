import os
from flask import Flask, render_template, request, redirect, url_for, flash, session, Blueprint
from musicgames import mysql
import MySQLdb.cursors

grupos = Blueprint('grupos', __name__, template_folder='../templates/grupo/templates')

# Selecciono Crear Grupo (Teacher)
@grupos.route('/group/create')
def create_grupo():
    if 'loggedin' in session:
        # Buscamos al profesor por su id
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM teacher WHERE teacher_id = %s", [session['teacher_id']])
        account = cursor.fetchone()
        return render_template('create.html', teacher=account, title='Crear Grupo')
    return redirect(url_for('teachers.login_t'))

# Creo Grupo (Teacher)
@grupos.route('/group/create/add', methods=['GET', 'POST'])
def add_grupo():
    if 'loggedin' in session:
        cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cur.execute("SELECT * FROM teacher WHERE teacher_id = %s", [session['teacher_id']])
        acc = cur.fetchone()
        if request.method == 'POST' and 'name' in request.form and 'classroom' in request.form:
            # Se crea un acceso facil para las variables
            name = request.form['name']
            classroom = request.form['classroom']
            # Comprueba si el grupo existe
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute("SELECT * FROM grupo WHERE name = %s", [name])
            account = cursor.fetchone()
            # Si el grupo existe muestra un error de validacion
            if account:
                flash('Grupo ya existente!', 'danger')
                return redirect(url_for('teachers.teacher_profile'))
            elif not name or not classroom:
                flash('Por favor, rellene el formulario.', 'danger')
            else:
                # Si el grupo no existe, pasamos a crearlo
                cursor.execute('INSERT INTO grupo (name, classroom) VALUES (%s, %s)', (name, classroom))
                mysql.connection.commit()
                flash('Confirme su grupo, por favor', 'primary')
                return render_template('confirm.html', teacher=acc, title='Confirmar Grupo')
        elif request.method == 'POST':
            flash('Por favor, rellene el formulario.', 'danger')
        return render_template('create.html', teacher=acc, title='Crear Grupo')

# Confirmar grupo (Teacher)
@grupos.route('/group/create/confirm', methods=['GET', 'POST'])
def confirm_group():
    if 'loggedin' in session:
        if request.method == 'POST' and 'id_teacher' in request.form and 'name' in request.form:
            id_teacher = request.form['id_teacher']
            name = request.form['name']
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute("SELECT * FROM grupoteacher WHERE name_grupo = %s", [name])
            account = cursor.fetchone()
        # Si el grupo ya esta asociado muestra un error de validacion
            if account:
                flash('El grupo ya pertenece a otro/a profesor/a.', 'danger')
                return redirect(url_for('teachers.teacher_profile'))
            else:
                # Al no estar asociado, lo asociamos al profesor
                cursor.execute('INSERT INTO grupoteacher (id_teacher, name_grupo) VALUES (%s, %s)', (id_teacher, name))
                mysql.connection.commit()
                flash('Se ha asociado correctamente a su grupo.', 'success')
                return redirect(url_for('teachers.teacher_profile'))
        elif request.method == 'POST':
            flash('Por favor, rellene el formulario.', 'danger')
        return render_template('confirm.html', title='Confirmar Grupo')

# Selecciono Gestionar Grupo (Teacher)
@grupos.route('/teacher/group')
def manage_grupo():
    if 'loggedin' in session:
        # Se buscan todos los grupos pertenecientes a cada profesor
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("""
        SELECT grupo.name, grupo.classroom, teacher.fullname, teacher.teacher_id
        FROM teacher
        INNER JOIN grupoteacher ON teacher.teacher_id = grupoteacher.id_teacher
        INNER JOIN grupo ON grupoteacher.name_grupo = grupo.name""")
        account = cursor.fetchall()
        return render_template('manage.html', manages=account, teacher=session['teacher_id'], title='Mis grupos')
    return redirect(url_for('teachers.login_t'))

# Ver Grupo (Teacher)
@grupos.route('/group/<name>')
def show_grupo(name):
    if 'loggedin' in session:
        cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cur.execute("SELECT * FROM grupo WHERE name = %s", [name])
        acc = cur.fetchone()
        # Buscamos todos los alumnos pertenecientes al grupo dirigido por el profesor
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("""
        SELECT alumn.fullname, alumn.username, grupo.name,
        grupo.grupo_id, grupo.classroom
        FROM grupo
        INNER JOIN grupoalumn ON grupo.name = grupoalumn.name_grupo
        INNER JOIN alumn ON grupoalumn.id_alumn = alumn.alumn_id""")
        account = cursor.fetchall()
        return render_template('grupo.html', manages=account, grupo=acc, title='Info Grupo')
    return redirect(url_for('teachers.login_t'))

# Ver puntuacines alumnos (Teacher)
@grupos.route('/group/alumn/<username>')
def show_results(username):
    # Resultados Game 1
    cursor1 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    game1 = "Notas Musicales"
    cursor1.execute("""
    SELECT SUM(IF(name_game = %s AND user_name = %s, points, 0)) total
    FROM result
    """, (game1, username))
    account1 = cursor1.fetchone()

    # Resultados Game 2
    cursor2 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    game2 = "Equivalencias Musicales"
    cursor2.execute("""
    SELECT SUM(IF(name_game = %s AND user_name = %s, points, 0)) total
    FROM result
    """, (game2, username))
    account2 = cursor2.fetchone()

    # Resultados Game 3
    cursor3 = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    game3 = "Atrapa al Intruso"
    cursor3.execute("""
    SELECT SUM(IF(name_game = %s AND user_name = %s, points, 0)) total
    FROM result
    """, (game3, username))
    account3 = cursor3.fetchone()

    return render_template('results_alumn.html', title='Puntuaciones', username=username, puntos1=account1, puntos2=account2, puntos3=account3)

# Editar aula del grupo (Teacher)
@grupos.route('/group/<name>/edit')
def edit_group(name):
    if 'loggedin' in session:
        # Buscamos al grupo por su nombre
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM grupo WHERE name = %s", [name])
        account = cursor.fetchone()
        return render_template('edit_g.html', grupo=account, title='Modificar Aula')
    return redirect(url_for('teachers.login_t'))

# Actualizar aula (Teacher)
@grupos.route('/group/update/<name>', methods=['POST'])
def update_group(name):
    if request.method == 'POST':
        classroom = request.form['classroom']
        # Se actualiza el aula del grupo
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("UPDATE grupo SET classroom = %s WHERE name = %s", (classroom, name))
        mysql.connection.commit()
        flash('Aula actualizada correctamente.', 'success')
        return redirect(url_for('grupos.manage_grupo'))
    return render_template('edit_g.html', title='Modificar Aula')

# Eliminacion del grupo (Teacher)
@grupos.route('/group/<name>/select')
def supr_group(name):
    if 'loggedin' in session:
        # Seleccionamos el grupo por su nombre
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM grupo WHERE name = %s", [name])
        account = cursor.fetchone()
        return render_template('delete_g.html', grupo=account, title='Eliminar Grupo')
    return redirect(url_for('teachers.login_t'))

# Eliminar Grupo (Teacher)
@grupos.route('/group/delete/<name>', methods=['POST'])
def delete_group(name):
    if request.method == 'POST':
        name = request.form['name']
        # Eliminamos el grupo por su nombre
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("DELETE FROM grupo WHERE name = %s", [name])
        mysql.connection.commit()
        flash('Grupo eliminado correctamente.', 'success')
        return redirect(url_for('grupos.manage_grupo'))
    return render_template('delete_g.html', title='Eliminar Grupo')
# --------------------------------------------------------------------------------------
# Selecciono Elegir Grupo (Alumn)
@grupos.route('/group/choise')
def select_choise_grupo():
    if 'loggedin' in session:
        # Se busca al alumno por su id
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("SELECT * FROM alumn WHERE alumn_id = %s", [session['alumn_id']])
        account = cursor.fetchone()
        return render_template('choise.html', alumn=session['alumn_id'], title='Elegir grupo')
    return redirect(url_for('alumns.login_a'))

# Asociar grupo a alumno/a (Alumn)
@grupos.route('/group/choise/mygroup', methods=['GET', 'POST'])
def choise_grupo():
    if 'loggedin' in session:
        if request.method == 'POST' and 'id_alumn' in request.form and 'name_grupo' in request.form:
            id_alumn = request.form['id_alumn']
            name_grupo = request.form['name_grupo']
            # Con el id del alumno y el nombre del grupo
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute("SELECT * FROM grupoalumn WHERE id_alumn = %s", [id_alumn])
            account = cursor.fetchone()
            # Si el alumnado ya ha elegido muestra un error de validacion
            if account:
                flash('Ya pertenece a un grupo.', 'danger')
                return redirect(url_for('alumns.alumn_profile'))
            else:
                # Si el alumno no ha elegido grupo, se le asocia el grupo ingresado
                cursor.execute('INSERT INTO grupoalumn (id_alumn, name_grupo) VALUES (%s, %s)', (id_alumn, name_grupo))
                mysql.connection.commit()
                flash('Se ha asociado correctamente a su grupo.', 'success')
                return redirect(url_for('alumns.alumn_profile'))
        elif request.method == 'POST':
            flash('Por favor, rellene el formulario.', 'danger')
        return render_template('choise.html', title='Elegir Grupo')

# Selecciono Mi Grupo (Alumn)
@grupos.route('/alumn/group')
def see_grupo():
    if 'loggedin' in session:
        # Se busca el grupo del alumno
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("""
        SELECT grupo.name, grupo.classroom, alumn.fullname, alumn.alumn_id
        FROM alumn
        INNER JOIN grupoalumn ON alumn.alumn_id = grupoalumn.id_alumn
        INNER JOIN grupo ON grupoalumn.name_grupo = grupo.name""")
        account = cursor.fetchall()
        return render_template('see.html', manages=account, alumn=session['alumn_id'], title='Mi grupo')
    return redirect(url_for('alumns.login_a'))

# Ver Profesor (Alumn)
@grupos.route('/alumn/group/<name>/teacher')
def grupo_teacher(name):
    if 'loggedin' in session:
        # Se busca por el nombre del grupo, el profesor que lo imparte
        cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cur.execute("SELECT * FROM grupo WHERE name = %s", [name])
        acc = cur.fetchone()
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute("""
        SELECT teacher.fullname, teacher.email, grupo.name,
        grupo.grupo_id, grupo.classroom
        FROM grupo
        INNER JOIN grupoteacher ON grupo.name = grupoteacher.name_grupo
        INNER JOIN teacher ON grupoteacher.id_teacher = teacher.teacher_id""")
        account = cursor.fetchall()
        return render_template('grupo_teacher.html', manages=account, grupo=acc, title='Profesor Grupo')
    return redirect(url_for('alumns.login_a'))
