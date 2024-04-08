"""
AUTHORS: Lane Affield , 
DATE CREATED: 3/27/24
LAST EDIT:
LAST EDIT BY:
EDIT NOTES :

DESCTIPTION:
    This file is for interacting with the spotify api. 
    

    NOTE: playing a previous playing a previous song will require more than just a call 
          - need to keep track of ID of next song and queue it next, then add it back to the api

 closing time uri (important) spotify:artist:1TqQi97nqeiuOJrIFv5Sw0
          

"""



import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os 
from dotenv import load_dotenv
from flask import Flask, redirect, request, session, render_template


load_dotenv()
client_id = os.getenv("CLIENT_ID")  # client_ID in the .env file, can be found in you rspotify Project Info
client_secret = os.getenv("CLIENT_SECRET")  # same as client_id
redirect_uri = "http://127.0.0.1:5000/callback"  # this is the redirect uri after login
scopes = "playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-top-read user-follow-read streaming user-modify-playback-state user-read-playback-state"
sp = spotipy.Spotify(
    auth_manager=SpotifyOAuth(client_id, client_secret, redirect_uri, scope=scopes)
)
app = Flask(__name__)

#begins session useing spi
@app.route("/")
def start():
    return "session begun"

@app.route("/callback")
def callback():
    session = start()
    return session

#pauses a song
@app.route("/pause")
def pause_music():
    sp.pause_playback()
    return "paused"


#plays a song
@app.route("/play")
def play_music():
   sp.start_playback()
   return "played"


#adds a song to queue
@app.route("/queue/<song_uri>")
def queue_song(song_uri):
    sp.add_to_queue(uri=song_uri)
    return f"queued: {song_uri}"

@app.route("/previous")
def previous_song():
    sp.previous_track()
    return "played previous track"

@app.route("/next")
def next_song():
    sp.next_track()
    return "next song played"    

@app.route("/song_info")
def song_info():
    current = sp.current_playback()
    
    song_data = {"song": current["item"]["name"],
                  "song_uri" : current["item"]["uri"],
                  "artist" : current["item"]["artists"][0]["name"],
                  "duration_ms" : current["item"]["duration_ms"], 
                  "album_img" : current["item"]["album"]["images"][1]
                     }
    return song_data

@app.route("/session_info/<ids>")
def session_info(ids):
    sp.audio_features(tracks = ids)

@app.route("/closing_time")
def closing_time():

    sp.start_playback(uris=['spotify:track:1A5V1sxyCLpKJezp75tUXn'])
    return "GET OUT"



app.run(debug=True)