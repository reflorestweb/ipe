from flask import Flask, render_template, request, url_for, flash, redirect
import os, datetime
import sqlite3
from flask_sqlalchemy import SQLAlchemy

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "database.db"))

app = Flask('__name__')
app.config['SECRET_KEY'] = 'your secret key'
app.config["SQLALCHEMY_DATABASE_URI"] = database_file
db = SQLAlchemy(app)

class Posts(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   created = db.Column(db.DateTime, default=datetime.datetime.utcnow)
   title = db.Column(db.String(80), nullable=False)
   content = db.Column(db.String(200), nullable=False)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cadastro')
def cadastro():
    return render_template('Cadastro.html')

@app.route('/dashboard')
def dashboard():
    return render_template('Dashboard/dashboard.html')

@app.route('/historico')
def historico():
    return render_template('Dashboard/historico.html')

@app.route('/plantas')
def plantas():
    return render_template('Dashboard/plantas.html')