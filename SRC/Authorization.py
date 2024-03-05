"""
Date Created: 03/04/2024
Author(s): Lane Affield

Last Date Updated 06/10/2023
Last Edited By: Lane Affield
Edit Notes: added comments
Sources: How to use Spotify's API with Python by Linode on Youtube (https://www.youtube.com/watch?v=WAmEZBEeNmg), ChatGPT
Description: This file is the functions needed to gain access to the token that will allow the program to access user data
"""
from flask import Flask, request, redirect, session, render_template
from dotenv import load_dotenv
import os
import base64
import requests
from requests import post
import json
import secrets
import hashlib
from urllib.parse import urlencode


load_dotenv()  # accesses the variables in the .env file

client_id = os.getenv(
    "CLIENT_ID"
)  # client_ID in the .env file, can be found in you rspotify Project Info
client_secret = os.getenv("CLIENT_SECRET")  # same as client_id
redirect_uri = "http://127.0.0.1:5000/callback"  # this is the redirect uri after login

# endpoints needed
authorization_url = "https://accounts.spotify.com/authorize"
token_url = "https://accounts.spotify.com/api/token"
api_base_url = "https://api.spotify.com/v1"

# scopes required (what types of data we want to access and how to use it)
scopes = [
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-library-read",
    "user-library-modify",
    "user-top-read",
    "user-follow-read",
]


def generate_code_verifier():  # generates a code to verify for API access
    return secrets.token_urlsafe(64)


def generate_code_challenge(
    verifier,
):  # this works as a form of encryption for the API, increases security
    code_challenge = (
        base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest())
        .decode("utf-8")
        .rstrip("=")
    )
    return code_challenge


def index():  # this is the index that is sent to authorize our login
    code_verifier = generate_code_verifier()
    code_challenge = generate_code_challenge(code_verifier)
    session["code_verifier"] = code_verifier
    auth_dict = {
        "response_type": "code",
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "code_challenge": code_challenge,
        "code_challenge_method": "S256",
        "scope": " ".join(scopes),
    }
    authentication_url = authorization_url + "?" + urlencode(auth_dict)
    return redirect(authentication_url)


# @app.route('/callback')
def callback():  # this is the function that will recieve the token, after vreification it will be returned
    auth_code = request.args.get("code")
    code_verifier = session.pop("code_verifier", None)

    token_params = {
        "grant_type": "authorization_code",
        "code": auth_code,
        "redirect_uri": redirect_uri,
        "client_id": client_id,
        "code_verifier": code_verifier,
    }
    headers = {
        "Authorization": "Basic "
        + base64.b64encode((client_id + ":" + client_secret).encode()).decode("utf-8")
    }
    response = post(token_url, data=token_params, headers=headers)
    response_data = json.loads(response.text)
    try:
        user_access_token = response_data["access_token"]
        session["token"] = user_access_token
        return render_template("retrieval.html")
    except:
        return "Error in retrieving token"


def refresh_token(refresh_token):  # refreshes token if necessary
    token_params = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id": client_id,
        "client_secret": client_secret,
    }
    response = requests.post(
        "https://accounts.spotify.com/api/token", data=token_params
    )
    if response.status_code == 200:
        response_data = response.json()
        return response_data["access_token"]
    else:
        return None
