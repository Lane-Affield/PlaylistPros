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
from flask import Flask, redirect, request, session, render_template, jsonify
from flask_cors import CORS

''''''

load_dotenv()
client_id = os.getenv("CLIENT_ID")  # client_ID in the .env file, can be found in you rspotify Project Info
client_secret = os.getenv("CLIENT_SECRET")  # same as client_id
redirect_uri = "http://127.0.0.1:5000/callback"  # this is the redirect uri after login
scopes = "playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-top-read user-follow-read streaming user-modify-playback-state user-read-playback-state"


'''
sp = spotipy.Spotify(
    auth_manager=SpotifyOAuth(client_id, client_secret, redirect_uri, scope=scopes)
)
'''

app = Flask(__name__)
CORS(app, origins='*')
app.secret_key = "your_secret_key"  # Set a secret key for session management
banned_tracks = []
queue = []
session_data = []
sp_oauth = SpotifyOAuth(client_id, client_secret, redirect_uri, scope=scopes)


#begins session useing spi
@app.route("/")
def start():

    '''
    global sp
    sp = spotipy.Spotify(
    auth_manager=SpotifyOAuth(client_id, client_secret, redirect_uri, scope=scopes)
    )
    return "connected"
    '''
    if "spotify_token" in session:
        return "You are already authenticated."
    else:
        # Redirect to Spotify authorization page
        auth_url = sp_oauth.get_authorize_url()
        return redirect(auth_url)

@app.route("/callback")
def callback():
    code = request.args.get("code")
    if code:
        # Exchange code for access token
        token_info = sp_oauth.get_access_token(code)
        session["spotify_token"] = token_info["access_token"]
        return "Authentication successful! You can now use the application."
    else:
        return "Error: Failed to authenticate with Spotify."
    
@app.route("/logout")
def logout():
    # Clear user session
    session.clear()
    return "Logged out successfully."

    #return session

#pauses a song
@app.route("/pause")
def pause_music():
    try: 
        sp.pause_playback()
        return "paused"
    except: 
        try: 
            sp.start_playback()
            return "played"
        except:
            return "error"

#adds a song to queue
@app.route("/queue/<song_uri>")
def queue_song(song_uri):
    sp.add_to_queue(uri=song_uri)
    return f"playing next: {song_uri}"

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

  # Refresh token logic
    current = sp.current_playback()
    track_progress_sec = current["item"]["duration_ms"]*.001 - current["progress_ms"]*.001 
    track_progress_secs = int(round(track_progress_sec % 60, 0))
    track_progress_secs = str(track_progress_secs).zfill(2)
    track_progress_min = int(track_progress_sec // 60)
    returned_time = f"{track_progress_min}:{track_progress_secs}"
    if  (track_progress_sec < 5 and track_progress_min == 0) and len(queue) > 0:
        sp.add_to_queue(queue[0])
        session_data.append(queue[0])
        print(len(queue))
        queue.pop(0)
        print(len(queue))


    song_data = {"song": current["item"]["name"],
                  "song_uri" : current["item"]["uri"],
                  "artist" : current["item"]["artists"][0]["name"],
                  "duration_ms" : current["item"]["duration_ms"]*.001,
                  "position_ms": current["progress_ms"]*.001 , 
                  "time_location" : returned_time , 
                  "album_img" : current["item"]["album"]["images"][0]["url"]
                     }
    return jsonify(song_data)

@app.route("/session_info/<ids>")
def session_info(ids):
    sp.audio_features(tracks = ids)

@app.route("/session/queue_info")
def queue_info():
    track_ids = []
    for uri in queue:
    # Split the URI by ':' and get the third element (track ID)
        track_id = uri.split(':')[2]
        track_ids.append(track_id)

    queue_data =  sp.tracks(tracks=track_ids)
    queue_adjusted = []
    count = 0
    for items in queue_data["tracks"]:
        current = {
                    "album_img" : items["album"]["images"][1]["url"], 
                    "artist_name" : items["artists"][0]["name"], 
                    "track_name" : items["name"] , 
                    "position_in_queue" : count
                  }
        count +=1
        queue_adjusted.append(current)
    if len(queue) == 0: 
        return "queue Empty"

    return queue_adjusted

@app.route("/closing_time")
def closing_time():
    sp.start_playback(uris=['spotify:track:1A5V1sxyCLpKJezp75tUXn'])
    return "GET OUT"

@app.route("/addqueue/<id>")
def add_to_queue(id):
    queue.append(id)
    return "added to queue"

@app.route("/search_song/<search>")
def search_song(search):
    search_results = []
    songs = sp.search(q= search , limit= 30)
    songs_adjusted = songs["tracks"]["items"]
    
    for x in range(len(songs_adjusted)):
        track_info = {
            "song_uri" : songs_adjusted[x]["uri"],
            "track_name" : songs_adjusted[x]["name"],
            "artist_name" : songs_adjusted[x]["artists"][0]['name'],
            "album_img" : songs_adjusted[x]['album']["images"][1]["url"]
        }
        search_results.append(track_info)
    return search_results

@app.route("/session/queue/<uri>/")
def session_queue(uri):
    if uri in banned_tracks: 
        return f"{uri} is banned, unable to queue"
    elif uri in queue: 
        return f"{uri} is already queued"
    else: 
        queue.append(uri)
        return f"queued {uri}"


def add_to_session(uri):
    session_data.append("uri")
    return f"{uri} has been added to session records"

@app.route("/session/ban/<uri>")
def add_to_banned(uri):
    banned_tracks.append(uri)
    print(banned_tracks)
    return f"banned {uri}"
app.run(debug=True)