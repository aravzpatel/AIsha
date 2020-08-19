from flask import (Flask, render_template, request, json)
from bot import Bot

app = Flask("__main__")

@app.route("/")
def my_index():
    return render_template("index.html", flask_token="Hello world")

@app.route("/api/help", methods = ['POST'])
def my_api_help():
    user = request.form['user_text']
    print(user)
    bot_response = Bot.analyse(Bot(), user)
    response = app.response_class(
        response=json.dumps(bot_response),
        status=200,
        mimetype='application/json'
    )
    return response

app.run(debug=True)