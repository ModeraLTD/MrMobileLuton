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


@app.route("/about")
def about():
    return ""


@app.route("/products")
def products():
    return render_template("products.html")


@app.route("/repairs")
def repairs():
    return render_template("repairs.html")


@app.route("/contact")
def contact():
    return ""


def main():
    app.run(debug=True)


if __name__ == "__main__":
    main()
