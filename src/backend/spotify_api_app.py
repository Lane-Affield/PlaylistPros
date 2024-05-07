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




import datetime
import pandas as pd
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os 
from dotenv import load_dotenv
from flask import Flask, redirect, request, session, render_template, jsonify
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, current_user, login_required
from DB_Queries import PlaylistProsCrud

''''''
load_dotenv()
client_id = os.getenv("CLIENT_ID")  # client_ID in the .env file, can be found in you rspotify Project Info
client_secret = os.getenv("CLIENT_SECRET")  # same as client_id
redirect_uri = "http://127.0.0.1:5000/callback"  # this is the redirect uri after login
scopes = "playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-top-read user-follow-read streaming user-modify-playback-state user-read-playback-state"
''''''
#sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id, client_secret, redirect_uri, scope=scopes))
app = Flask(__name__)
CORS(app, origins='*')
sp = None


class User(UserMixin):
    def __init__(self, id, username):
        self.id = id
        self.username = username


# Login manager configuration
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    # Replace this with your logic to retrieve user by ID (e.g., database query)
    users = {  # Replace with database lookup
        1: User(1, "user1"),
        2: User(2, "user2"),
    }
    return users.get(int(user_id))

def create_spotify_object():
    global sp
    if not sp:
        sp = spotipy.Spotify(
            auth_manager=SpotifyOAuth(client_id, client_secret, redirect_uri, scope=scopes)        )
    return sp

banned_tracks = []
queue = []
session_data = []



#logs user into spotify to begin interaction
@app.route("/")
def start():
    sp = create_spotify_object()
    global start_time 
    start_time = datetime.datetime.now()
    return "connected"
def get_or_create_spotify_object():
    global sp
    if not sp:
        sp = spotipy.Spotify(
            auth_manager=SpotifyOAuth(client_id, client_secret, redirect_uri, scope=scopes)
        )
    return sp
#what the user is returned to after accessing the API
@app.route("/callback")
def callback():
    sp = get_or_create_spotify_object()  # Ensure authenticated Spotify object
    code = request.args.get("code")  # Get authorization code from callback URL
    token = sp.auth_manager.get_access_token(code)  # Exchange code for access token
    # Store access token in session or database (not shown here)
    return redirect("http://127.0.0.1:8080/home/"+ user)

    #return session

@app.route("/profile")
@login_required  # Restricts access to logged-in users
def profile():
    if current_user is not None:
        # Access user-specific data (e.g., username)
        username = current_user.username
        return f"Welcome back, {username}!"
    else:
        return "You are not logged in."

@app.route("/login/<username>")
def login(username):
    global user 
    user = username
    sp = get_or_create_spotify_object()  # Get or create authenticated Spotify object
    auth_url = sp.auth_manager.get_authorize_url()  # Use auth_manager for authorization URL
    return redirect(auth_url)




#PLAYER COMPONENTS
#initiates and sets up a new session for the user
@app.route("/session_setup/<name>/<start_song>/<banned_songs>")
def session_setup(name, start_song, banned_songs):
    banned_tracks = []
    queue = []
    banned = banned_songs.split(',')
    print(banned)
    for ban in banned: 
        banned_tracks.append(ban)
    sp.start_playback(uris=[start_song])
    return "session Begun"

#pauses and playes songs
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
#play previous Track
@app.route("/previous")
def previous_song():
    sp.previous_track()
    return "played previous track"
#plays next track in queue
@app.route("/next")
def next_song():
    if len(queue) != 0:
        curr_song = queue[0]
        sp.add_to_queue(curr_song)
        queue.pop(0)
    sp.next_track()
    return "next song played"

#get current song info, returns the album image, artist name, track name as well as the current time location in the song
@app.route("/song_info")
def song_info():
    current = sp.current_playback()
    track_progress_sec = current["item"]["duration_ms"]*.001 - current["progress_ms"]*.001 
    track_progress_secs = int(round(track_progress_sec % 60, 0))
    track_progress_secs = str(track_progress_secs).zfill(2)
    track_progress_min = int(track_progress_sec // 60)
    returned_time = f"{track_progress_min}:{track_progress_secs}"
    if  track_progress_sec < 2 and track_progress_min == 0 and len(queue) > 0:
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
#plays closing time so people know to leave
@app.route("/closing_time")
def closing_time():
    sp.start_playback(uris=['spotify:track:1A5V1sxyCLpKJezp75tUXn'])
    return "GET OUT"




#QUEUE CONTROLL
#adds a song to queue
@app.route("/queue/<song_uri>")
def queue_song(song_uri):
    sp.add_to_queue(uri=song_uri)
    return f"playing next: {song_uri}"

#removes a song form the queue
@app.route("/queue/remove/<uri>")
def remove_queue(uri):
    queue.remove(uri)
    return f"removed: {uri}"

@app.route("/session_info")
def session_info():
    global start_time
    results = sp.current_user_recently_played(after=start_time)
    
    session_info = []
    for item in results["items"]:
        data = {
            "track_name": item["track"]["name"],
            "artist_name": item["track"]["artists"][0]["name"],
            "duration_ms": item["track"]["duration_ms"]
        }
        session_info.append(data)

    df = pd.DataFrame(session_info)
    data_results = {
    "most_listened_to_artist": df['artist_name'].mode()[0],
    "most_listened_to_track": df['track_name'].mode()[0],
    "avg_song_length": df["duration_ms"].mean(),
    "num_songs": df.shape[0]
    }

    return jsonify(data_results)

#get info on the queue 
@app.route("/session/queue_info")
def queue_info():
    track_ids = []
    for uri in queue:
    # Split the URI by ':' and get the third element (track ID)
        print(uri)
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
    return queue_adjusted

#adds a song to the queue
@app.route("/addqueue/<id>")
def add_to_queue(id):
    queue.append(id)
    return "added to queue"

#bans a song from the session by appending to the banned list
@app.route("/session/ban/<uri>")
def add_to_banned(uri):
    banned_tracks.append(uri)
    print(banned_tracks)
    return f"banned {uri}"


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

#SEARCHES

app.run(debug=True)