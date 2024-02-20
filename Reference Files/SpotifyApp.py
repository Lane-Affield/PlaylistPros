"""
Date Created: 06/06/2023
Author(s): Lane Affield

Date of Last Edit: 06/19/2023
Last editor(s): Lane Affield
last Update Notes: updated the data that's retrieved from the 

Sources: 
Description: This file is what connects to flask so that the program may interact with the API
"""
from Authorization import index, callback, refresh_token
from flask import Flask, redirect, request, session, render_template
from Cache import read_cache, write_cache
import os
import requests

app = Flask(__name__)
app.secret_key = os.urandom(24)


@app.route("/")
def Home():  # This is the home screen created when the program is run
    return render_template("homepage.html")


@app.route("/connect")
def get_index():  # this is an implementation of the index function, which was created in the Authorization.py file
    value = index()
    return value


@app.route("/callback")
def get_callback():  # this function is what will send a user to the selection menu for their data
    value = callback()
    return value


@app.route("/<username>/<type>/<term>/<limit>")
def get_top(
    type, term, limit, username
):  # This function is what creates the top x tracks or artists of a user based on the form response in the callback url
    limit = int(limit)
    cache = read_cache()
    url = f"https://api.spotify.com/v1/me/top/{type}?time_range={term}&offset=99&limit=100"  # This is the URL used
    header = {"Authorization": f'Bearer {session["token"]}'}  # Token to verify access
    cache_key = str(
        username + term + str(limit)
    )  # This is a Unique Cache Key that would allow a user to quickly retrieve existing data from the cache
    if (
        cache_key in cache
    ):  # if the request exists within the cache then it just retrieves that data from the .cache file
        return cache[type][cache_key]

    else:  # if the data isn't already present, then it is fetched
        response = requests.get(url, headers=header)
        if response.status_code == 200:
            spotify_data = response.json()
            cache[type][cache_key] = spotify_data
            write_cache(cache)
        else:
            return "request not recognized"

    if (
        type == "tracks"
    ):  # this colects track info for the audio features of the top x tracks
        ids = get_ids(cache, cache_key, type)
        song_data_url = f"https://api.spotify.com/v1/audio-features?ids={ids}"
        response = requests.get(song_data_url, headers=header)
        audio_info = response.json()
        print(len(cache["tracks"][cache_key]["items"]))
        for x in range(len(cache["tracks"][cache_key]["items"])):
            audio_info["audio_features"][x]["album_name"] = cache[type][cache_key][
                "items"
            ][x]["album"]["name"]
            audio_info["audio_features"][x]["song_name"] = cache[type][cache_key][
                "items"
            ][x]["name"]
            audio_info["audio_features"][x]["artist_name"] = []

            artist_name_loc = cache[type][cache_key]["items"][x]["artists"]
            for f in range(len(artist_name_loc)):
                audio_info["audio_features"][x]["artist_name"].append(
                    artist_name_loc[f]["name"]
                )
        cache['audio_profiles'] =  audio_info 
        write_cache(cache)
        return audio_info
    else:
        return cache["artists"][cache_key]  # this returns the artists info


@app.route("/refresh_token")
def refresh_token_route():
    refreshed_token = refresh_token(session["refresh_token"])
    if refreshed_token is not None:
        session["token"] = refreshed_token
        return "Token refreshed successfully"
    else:
        return "Failed to refresh token"


def get_ids(
    cache, cache_key, type
):  # this function is used to get the ids of the top songs and return them as a string so that they may be called as a url
    specifier = cache[type][cache_key]["items"]
    id_string = ""
    for x in range(len(specifier)):
        instance = cache[type][cache_key]["items"][x]["id"]
        if x != len(specifier) - 1:
            id_string += f"{instance},"
        elif x == len(specifier) - 1:
            id_string += instance
    return id_string


@app.route('/data_analysis')
def data_analysis():
    return "Data Analysis"


@app.route("/end_program")  # This is what will reroute a user to the beginning of the program when they are done
def end_program():
    if os.path.exists('./Top_Spotify.json'):
        os.remove("Top_Spotify.json") #Get rid of the Cache
    return redirect("/") #sends user to the home page


app.run(debug=True)
