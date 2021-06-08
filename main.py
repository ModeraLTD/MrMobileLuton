import os
import flask
from flask import render_template

app = flask.Flask(__name__)
app.secret_key = os.urandom(24)
app.config["DEBUG"] = True
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0


@app.route("/")
def home():
    return render_template("home.html")


def main():
    app.run(debug=True)


if __name__ == "__main__":
    main()
