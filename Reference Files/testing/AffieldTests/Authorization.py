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

#Class for gaining authorization to the API
class Spiritfy_Authorization:
    #setting variables for instance of the class
    def __init__ (self, client_id, client_secret, redirect_url):
        #NOTE: client_id and client_secret from .env file
        self.client_id = client_id 
        self.client_secret = client_secret
        self.redirect_url = redirect_url
        self.authorization_url = "https://accounts.spotify.com/authorize" #url to authorize
        self.token_url = "https://accounts.spotify.com/api/token" #url to recieve token
        self.api_base_url = "https://api.spotify.com/v1" #api url 
        self.scopes = [
            "playlist-read-private",
            "playlist-read-collaborative",
            "playlist-modify-public",
            "playlist-modify-private",
            "user-library-read",
            "user-library-modify",
            "user-top-read",
            "user-follow-read",
        ] #what you want to have access to 

    #generates cryptographic code verifier, allows for secure sending of authorization token
    def generate_code_verifier(self):
        return secrets.token_urlsafe(64)
    
    #generates cryptographic code challenge, allows for secure sending of authorization token
    def generate_code_challenge(self, verifier):
        code_challenge = (
            base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest())
            .decode("utf-8")
            .rstrip("=")
        )
        return code_challenge
    
    def authorize(self):
        code_verifier = self.generate_code_verifier()
        code_challenge = self.generate_code_challenge(code_verifier)
        session["code_verifier"] = code_verifier
        auth_dict = {
            "response_type": "code",
            "client_id": self.client_id,
            "redirect_uri": self.redirect_uri,
            "code_challenge": code_challenge,
            "code_challenge_method": "S256",
            "scope": " ".join(self.scopes),
        }
        #function for authentication
        authentication_url = self.authorization_url + "?" + urlencode(auth_dict)
        return redirect(authentication_url)
    
    #callback after verification 
    def handle_callback(self):
        auth_code = request.args.get("code")
        code_verifier = session.pop("code_verifier", None)

        token_params = {
            "grant_type": "authorization_code",
            "code": auth_code,
            "redirect_uri": self.redirect_uri,
            "client_id": self.client_id,
            "code_verifier": code_verifier,
        }
        headers = {
            "Authorization": "Basic "
            + base64.b64encode((self.client_id + ":" + self.client_secret).encode()).decode("utf-8")
        }
        response = requests.post(self.token_url, data=token_params, headers=headers)
        response_data = json.loads(response.text)
        try:
            user_access_token = response_data["access_token"]
            session["token"] = user_access_token
            return render_template("retrieval.html")
        except:
            return "Error in retrieving token"
        
    #refresh Token for continued access.
    def refresh_token(self, refresh_token):
        token_params = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
            "client_id": self.client_id,
            "client_secret": self.client_secret,
        }
        response = requests.post(self.token_url, data=token_params)
        if response.status_code == 200:
            response_data = response.json()
            return response_data["access_token"]
        else:
            return None
        