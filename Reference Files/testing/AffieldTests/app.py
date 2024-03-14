"""
Sources: 
Description: This file is what connects to flask so that the program may interact with the API
"""
from Authorization import index, callback, refresh_token
from flask import Flask, redirect, request, session, render_template
#from Cache import read_cache, write_cache
import os
import requests

app = Flask(__name__)
app.secret_key = os.urandom(24)


@app.route("/")
def get_index():  # this is an implementation of the index function, which was created in the Authorization.py file
    value = index()
    return value


@app.route("/callback")
def get_callback():  # this function is what will send a user to the selection menu for their data
    value = callback()
    return value

@app.route("/refresh_token")
def refresh_token_route():
    refreshed_token = refresh_token(session["refresh_token"])
    if refreshed_token is not None:
        session["token"] = refreshed_token
        return "Token refreshed successfully"
    else:
        return "Failed to refresh token"


app.run(debug=True)