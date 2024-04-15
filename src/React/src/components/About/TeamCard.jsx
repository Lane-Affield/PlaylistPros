import React from 'react';

const TeamCard = ({ name, photo, bio, email }) => {
  return (
    <div className="card">
      <img src={photo} className="card-img-top" alt={name} />
      <div className="card-body">
        <h4 className="card-title font-weight-bold">{name}</h4>
        <p className="card-text">{bio}</p>
        <p className="card-text"><strong>Email:</strong> {email}</p>
      </div>
    </div>
  );
};

export default TeamCard;
