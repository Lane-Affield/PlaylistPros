'''
Author(s): Lane Affield
Created: 03/14/24
Last Update:03/14/24
Updated By: Lane Affield
Update Notes: Created File and Framework for file

Description: App for interacting with our website.


'''
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


@app.route("/pause")
def pause_music():
        try:
            url = "https://api.spotify.com/v1/me/player/pause"
            header = {"Authorization": f'Bearer {session["token"]}'}
            requests.Session().request('GET', url, headers=header)
            return "paused"
        except: 
            return "problem"


@app.route("/play")
def play_music():
   url = 'https://api.spotify.com/v1/me/player'
   header = {"Authorization": f'Bearer {session["token"]}'}
   values =  requests.Session().request('GET', url, headers=header)
   value = values.json()
   return value

@app.route("/queue")
def queue_song():
    pass

@app.route("/skip")
def skip_song():
    pass 
@app.route("/previous")
def previous_song():
    pass

@app.route("/song_info")
def song_info():
    pass
@app.route("/session_info")
def session_info():
    pass




app.run(debug=True, port= 8000)
