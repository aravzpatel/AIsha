from flask import (Flask, render_template, request, json, redirect, url_for, flash)
from bot import Bot
from flask_login import login_required, current_user, login_user, logout_user, LoginManager, UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from datetime import date
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.config['DEBUG'] = True

app.config['SECRET_KEY'] = '9OLWxND4o83j4K4iuopO'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://hzlkhsyj:qyEtuquP76Rh_nRn16uXpf2xsiv0WkvQ@dumbo.db.elephantsql.com:5432/hzlkhsyj'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy()
db.init_app(app)

login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)

# from models import User
# import models

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))

class Moodscores(db.Model):
    __tablename__ = 'moodscores'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id')) #link this to user table
    date = db.Column(db.Date) #check if that is data format
    moodscore = db.Column(db.JSON)

@login_manager.user_loader
def load_user(user_id):
    # since the user_id is just the primary key of our user table, use it in the query for the user
    return User.query.get(int(user_id))

@app.route("/")
def index():
    return render_template("index.html", flask_token="Hello world")

@app.route("/api/help", methods = ['POST'])
def my_api_help():
    user_text = request.json['user_text']
    user_id = request.json['user_id']
    emotion_response = Bot.analyse(Bot(), user_text)
    response = app.response_class(
        response=json.dumps(emotion_response),
        status=200,
        mimetype='application/json'
    )


    #print(emotion_response['moodscore'])
    # moodscore = {"Anger":0.035714590696088365, "Fear":0.007142911960008929, "Joy":0.9214267340638829, "Sadness":0.03571576328001969}
    moodscore = emotion_response['moodscore']
    new_moodscore = Moodscores(user_id=user_id, date=date.today(), moodscore=moodscore)

    # add the new user to the database
    db.session.add(new_moodscore)
    db.session.commit()

    return response

@app.route('/profile', methods = ['POST'])
# @login_required ADD THIS BACK IN BY UNCOMMENTING
def profile():
    user_id = request.json['user_id']
    print("We are in the post request")
    print(user_id)
    moodscore_history = Moodscores.query.filter_by(user_id=user_id).all()
    json_contents = []
    
    for x in moodscore_history:
        obj_contents = {'day': x.date.day, 'month': x.date.month, 'year': x.date.year, 'moodscore': x.moodscore}
        json_contents.append(obj_contents)

    # json_contents = {'error': True, 'data':'Please check your login details and try again.'}
    response = app.response_class(
            response=json.dumps(json_contents),
            status=200,
            mimetype='application/json'
        )
    return response

@app.route('/login')
def login():
    print('in login')
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login_post():

    email = request.json['email']
    password = request.json['password']
    user = User.query.filter_by(email=email).first()
    
    # check if user actually exists
    # take the user supplied password, hash it, and compare it to the hashed password in database
    if not user or not check_password_hash(user.password, password): 
        # flash('Please check your login details and try again.')
        # return redirect(url_for('login')) # if user doesn't exist or password is wrong, reload the page
        json_contents = {'error': True, 'data':'Please check your login details and try again.'}
        response = app.response_class(
            response=json.dumps(json_contents),
            status=200,
            mimetype='application/json'
        )
        return response

    # if the above check passes, then we know the user has the right credentials
    login_user(user)
    print(user.id)
    json_contents = {'error': False, 'data': user.id}

    response = app.response_class(
        response=json.dumps(json_contents),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/signup', methods=['POST'])
def signup_post():

    name = request.json['name']
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first() # if this returns a user, then the email already exists in database

    if user: # if a user is found, we want to redirect back to signup page so user can try again  
        flash('Email address already exists')
        # return redirect(url_for('signup'))
        json_contents = {'error': True, 'data':'Email address already exists'}
        response = app.response_class(
            response=json.dumps(json_contents),
            status=200,
            mimetype='application/json'
        )
        return response

    # create new user with the form data. Hash the password so plaintext version isn't saved.
    new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'))

    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()
    user = User.query.filter_by(email=email).first()
    login_user(user)
    print(user.name)
    print(user.id)
    json_contents = {'error': False, 'data': user.id}

    response = app.response_class(
        response=json.dumps(json_contents),
        status=200,
        mimetype='application/json'
    )
    return response
 

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run()
