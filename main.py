import os
import flask
from flask import render_template, request
import re

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
    return render_template("contact.html")


@app.route("/post/sendcontact", methods=["POST"])
def get_contact():
    args = request.get_json()
    check = validate_args(args)
    if not check["status"]:
        return check["response"], 400

    return {"response": "success"}


def validate_args(args):
    try:
        if not check_email(args["email"]):
            return {"status": False, "response": "Invalid email"}

        if len(args["subject"]) <= 10:
            return {"status": False, "response": "Short subject"}
        elif len(args["subject"]) > 50:
            return {"status": False, "response": "Long subject"}

        if len(args["body"]) <= 50:
            return {"status": False, "response": "Short body"}
        elif len(args["body"]) > 500:
            return {"body": False, "response": "Long body"}

        # handle it here

        return {"status": True}
    except Exception as e:
        return {"status": False, "response": f"Error: {str(e)}"}


def check_email(email):
    return re.match("^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$", email) is not None


def main():
    app.run(debug=True)


if __name__ == "__main__":
    main()
