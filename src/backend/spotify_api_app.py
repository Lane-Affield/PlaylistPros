import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os 
from dotenv import load_dotenv
from flask import Flask, request, redirect
from requests_oauthlib import OAuth2Session
from requests.auth import HTTPBasicAuth
import requests
import json

app = Flask(__name__)


load_dotenv()
client_id = os.getenv(
    "CLIENT_ID"
)  # client_ID in the .env file, can be found in you rspotify Project Info
client_secret = os.getenv("CLIENT_SECRET")  # same as client_id

AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
REDIRECT_URI = 'http://127.0.0.1:3000/' # my case is 'http://localhost:3000/callback'
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
SCOPE = [
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-library-read",
    "user-library-modify",
    "user-top-read",
    "user-follow-read",
    "streaming", 
    "user-modify-playback-state",
    "user-read-playback-state"

]

@app.route("/login")
def login():
    spotify = OAuth2Session(CLIENT_ID, scope=SCOPE, redirect_uri=REDIRECT_URI)
    authorization_url, state = spotify.authorization_url(AUTH_URL)
    return redirect(authorization_url)

@app.route("/callback", methods=['GET'])
def callback():
    code = request.args.get('code')
    res = requests.post(TOKEN_URL,
        auth=HTTPBasicAuth(CLIENT_ID, CLIENT_SECRET),
        data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': REDIRECT_URI
        })
    return json.dumps(res.json())

if __name__ == '__main__':
    app.run(port=3000,debug=True)
