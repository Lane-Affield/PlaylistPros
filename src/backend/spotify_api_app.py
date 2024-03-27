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


"""



import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os 
from dotenv import load_dotenv
from flask import Flask, redirect, request, session, render_template

load_dotenv()
client_id = os.getenv("CLIENT_ID")  # client_ID in the .env file, can be found in you rspotify Project Info
client_secret = os.getenv("CLIENT_SECRET")  # same as client_id
redirect_uri = "http://127.0.0.1:8000/callback"  # this is the redirect uri after login
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
    pass
    

@app.route("/song_info")
def song_info():
    current = sp.current_playback()
    return current

@app.route("/session_info/<ids>")
def session_info(ids):
    sp.audio_features(tracks = ids)

@app.route("/closing_time")
def closing_time():
    search_results = sp.search(q="Closing Time Semisonic", type="track")
# Check if search results are empty
    if len(search_results['tracks']['items']) == 0:
        print("No songs found for Closing Time by Semisonic")
    else:
    # Assuming the first result is the desired song
        song_uri = [search_results['tracks']['items'][0]['uri']]
        sp.start_playback(uris=song_uri)
        return "GET OUT"

app.run(debug=True, port= 8000)