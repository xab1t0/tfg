from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

app.secret_key = 'mysecretkey'

app.config['MYSQL_HOST']='127.0.0.1'
app.config['MYSQL_USER']='xab1t0'
app.config['MYSQL_PASSWORD']='121087'
app.config['MYSQL_DB']='school'

mysql = MySQL()

def create_app():

    mysql.init_app(app)

    from musicgames.teachers.views import teachers
    from musicgames.alumns.views import alumns
    from musicgames.grupos.views import grupos
    from musicgames.main.views import main
    from musicgames.api.views import api
    #from musicgames.errors.handlers import errors

    app.register_blueprint(teachers)
    app.register_blueprint(alumns)
    app.register_blueprint(grupos)
    app.register_blueprint(main)
    app.register_blueprint(api)
    #app.register_blueprint(errors)

    return app
