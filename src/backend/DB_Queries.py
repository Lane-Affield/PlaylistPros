"""
Author(s): Riley Rongere, Lane Affield
Created: 03/14/24
Last Update:04/15/24
Updated By: Riley Rongere
Update Notes: Connected to the dynamodb database and added CRUD functionality

Description: App for interacting with our website.
"""


import boto3
import os
from dotenv import load_dotenv

class PlaylistProsCrud():

    # Establish a dynamodb connection
    def __init__(self):
        load_dotenv()
        self.dynamoClient = boto3.resource('dynamodb',
                            aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID"), 
                            aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_ID"),
                            region_name = 'us-east-2',
                            )
        self.tableName = 'PlaylistPros'
    
    # retrieves the table
    def __getTable(self):
        return  self.dynamoClient.Table(self.tableName)
    
    # returns a 'Key' with the username and passkey. This is passed into each CRUD function.
    def __getKey(self, username):
        Key={
        'username' : username
        }
        return Key
    
    # verifies a user's passkey
    def verifyUserPass(self, username, passkey):
        # retrieve the user
        user = self.getUser(username)
        # if the passkey is correct
        if user['passkey'] == passkey:
            return True
        else:
            return False
        
    # update user passkey
    def updatePasskey(self, username, currentPasskey, newPasskey):
        # if the correct username and passkey are entered
        if self.verifyUserPass(username, currentPasskey):
            table = self.__getTable()
            Key = self.__getKey(username)
            table.update_item(
                Key= Key,
                UpdateExpression='SET passkey = :val1',
                ExpressionAttributeValues={
                    ':val1': newPasskey
                }
            )
            return "Updated password successfully."
        else: 
            return "Username or passkey is incorrect."
    
    # create a new user with the given username
    def createUser(self, username, passkey):
        # check if the user already exists
        if type(self.getUser(username)) == dict:
            return "User already exists."
        else:
            table = self.__getTable()
            table.put_item(Item = {
                'username': username,
                'passkey': passkey,
                'sessions': {}
            })
            return "Created user successfully."

    # deletes a user with the given username, regardless if the user exists
    def deleteUser(self, username):
        table = self.__getTable()
        Key = self.__getKey(username)
        try:
            table.delete_item(Key = Key)
            return "Successfully deleted user."
        except:
            return "Failed to delete user."
        
    # retrieve a user dict from the table using the Key (username and passkey)
    def getUser(self, username) -> dict:
        # get the user table
        table = self.__getTable()

        # get the response
        Key = self.__getKey(username)
        response = table.get_item(Key = Key)

        # get the user from the response
        try:
            user = response['Item']
        except KeyError:
            return "User not in table."

        return user

    # Create a session for the user, 'username', with the name 'SessionName'.
    def createSession(self, username, sessionName):
        table = self.__getTable()
        Key = self.__getKey(username)

        try:
            table.update_item(
                Key = Key,
                UpdateExpression = "SET sessions.#sessionName = :emptyList",
                ExpressionAttributeNames = { "#sessionName" : sessionName },
                ExpressionAttributeValues = { ":emptyList" : []},
                ConditionExpression = "attribute_not_exists(sessions.#sessionName)",
            )
            return "Session successfully created."
        except:
            return "Session already exists."

    # deletes username's session, 'sessionName', regardless of whetheror not it exists.
    def deleteSession(self, username, sessionName):
        table = self.__getTable()
        Key = self.__getKey(username)

        table.update_item(
            Key = Key,
            UpdateExpression='REMOVE sessions.#sessionName',
            ExpressionAttributeNames={ '#sessionName' : sessionName }
        )
        return "Session successfully deleted."

    # retrieve a all sessions and return them as a list
    def getAllSessions(self, username) -> dict:
        sessions = self.getUser(username)['sessions']

        return sessions

    # retrieve the songs in a given session from a given user
    def getSessionSongs(self, username, sessionName) -> set:
        songs = self.getUser(username)['sessions'][sessionName]

        return songs
    
    # add a list of songs to a given session from a given user
    def addSessionSongs(self, username, sessionName, songsToAdd: list):
        table = self.__getTable()
        Key = self.__getKey(username)

        # prevent duplicate songs
        curSongs = list(self.getSessionSongs(username, sessionName))
        songsCombined = songsToAdd + curSongs
        noDupes = list(set(songsCombined))

        try:
            table.update_item(
                Key = Key,
                UpdateExpression = "SET sessions.#sessionName = :songs",
                ExpressionAttributeNames = { "#sessionName" : sessionName },
                ExpressionAttributeValues = { ":songs" : noDupes },
                ConditionExpression = "attribute_exists(sessions.#sessionName)",
            )
            return "Songs successfully added."
        except:
            return "Failed to add songs."

    def deleteSessionSongs(self, username, sessionName, songsToRemove: list):
        table = self.__getTable()
        Key = self.__getKey(username)

        # remove songs from curSongs
        curSongs = list(self.getSessionSongs(username, sessionName))
        remSongs = [song for song in curSongs if song not in songsToRemove]

        try:
            table.update_item(
                Key = Key,
                UpdateExpression = "SET sessions.#sessionName = :songs",
                ExpressionAttributeNames = { "#sessionName" : sessionName },
                ExpressionAttributeValues = { ":songs" : remSongs },
                ConditionExpression = "attribute_exists(sessions.#sessionName)",
            )
            return "Songs successfully removed."
        except:
            return "Failed to remove songs."


instance = PlaylistProsCrud()

# # Make sure you're not overiding users
# createLog = instance.createUser('user1', 'passkey1')
# print(createLog)
# createLog = instance.createUser('user1', 'passkey2')
# print(createLog)

# # get a user 
# getLog = instance.getUser('user1')
# print(getLog)

# return 'user not in table' if no user
# getLog = instance.getUser('user2')
# print(getLog)

# # delete a user
# delLog = instance.deleteUser('user1')
# print(delLog)
# getLog = instance.getUser('user1')
# print(getLog)

# # test verifyUserPass
# verLog = instance.verifyUserPass('example_user','example_passkey')
# print(verLog)
# verLog = instance.verifyUserPass('example_user','wrong_passkey')
# print(verLog)

# # test updatePasskey
# createLog = instance.createUser('user1', 'passkey1')
# print(createLog)
# upLog = instance.updatePasskey('user1', 'passkey1', 'newPasskey1')
# print(upLog)
# upLog = instance.updatePasskey('user1', 'passkey1', 'newPasskey1')
# print(upLog)

# # test creating a new session
# createLog = instance.createUser('user1', 'passkey1')
# print(createLog)
# createSessionLog = instance.createSession('user1','test_session')
# print(createSessionLog)
# getLog = instance.getUser('user1')
# print(getLog)

# # test deleting a session
# delLog = instance.deleteSession('user1', 'test_session')
# getLog = instance.getUser('user1')
# print(getLog)

# # test getAllSessions
# allSessionsLog = instance.getAllSessions('user1')
# print(allSessionsLog)

# test getSessionSongs
# allSongsLog = instance.getSessionSongs('user1', 'test_session')
# print(allSongsLog)

# test addSessionSongs
# addSongsLog = instance.addSessionSongs('user1', 'test_session', songs = ['song1','song2'])
# print(addSongsLog)
# allSongsLog = instance.getSessionSongs('user1', 'test_session')
# print(allSongsLog)

# test deleteSessionSongs
# allSongsLog = instance.getSessionSongs('user1', 'test_session')
# print(allSongsLog)
# remSongLog = instance.deleteSessionSongs('user1','test_session', ['song1'])
# allSongsLog = instance.getSessionSongs('user1', 'test_session')
# print(allSongsLog)