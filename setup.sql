CREATE TABLE IF NOT EXISTS USER (
   username            varchar(45)         NOT NULL,
   passcode            varchar(30)         NOT NULL,
   PRIMARY KEY (username)
);


CREATE TABLE IF NOT EXISTS SESSION_SONGS (
   songID              varchar(100)        NOT NULL,
   PRIMARY KEY (songID)
);
