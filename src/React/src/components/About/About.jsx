import React from 'react';
import TeamCard from './TeamCard';

const About = () => {
  return (
    <div className="container">
      <h1 className="text-center">About</h1>
      <div className="row">
        <h2>Playlist Pros</h2>
        <p>We have all been to an event where the music is terrible. This website aims to allow event-goers to input their 
            favorite songs into a playlist that will play throughout the event. Our team, Playlist Pros, is made up of four 
            Computer Science seniors enrolled in our final capstone course. We were inspired to create this website because 
            we all have a passion for music and how it can bring people together at an event.</p>
        <p>Meet our group members below:</p>
      </div>
      <div className="row">
        <div className="col-md-3">
          <TeamCard
            photo="emma.jpg"
            name="Emma Gerdeman"
            bio="Emma is orignally from San Clemente, CA. Her passion for computer science began when she
            she realized how it affects our everyday life and the continuous growth and development
            the field has. In her free time, Emma loves working out, cooking, and being at the beach.
            She plans to move home post-grad after graduating in three years and find a job as a data scientist!"
            email="emma.gerdeman@drake.edu"
          />
        </div>
        <div className="col-md-3">
          <TeamCard
            photo="lane.jpg"
            name="Lane Affield"
            bio="Lane Affield, a Atchison, KS native, started his interest in computer science because he grew 
            up playing lots of puzzles. He felt that coding was like a puzzle, meaning, there are small 
            pieces that come together to make the final project. Lane will be working at 
            Principal Financial Group this summer as their software engineering intern here in Des Moines, IA
            before finishing up his last semester at Drake in the fall!"
            email="lane.affield@drake.edu"
          />
        </div>
        <div className="col-md-3">
          <TeamCard
            photo="riley.jpg"
            name="Riley Rongere"
            bio="Riley Rongere, from Otsego, MN, had a passion for electronics from an early age and wanted to continue
            that in his college career. Riley is graduating in three years and has participated in Dr. Manley's 
            research group using machine learning techniques to predict bank failure since he was a freshman. He enjoys
            playing with his dog and cooking for close friends. Riley will be moving back home post-grad and plans
            to be a software engineer!"
            email="rileyrongere@gmail.com"
          />
        </div>
        <div className="col-md-3">
          <TeamCard
            photo="nick.jpg"
            name="Nick Wharff"
            bio="Nick Wharff is from West Des Moines, IA and came to Drake to pursue two degrees in Math and Computer 
            Science. He is the president of the on-campus mathematics honors society, KME, has been an RA here 
            for three years, and has also participated in various mathematics competitions in the midwestern area. 
            Nick is currently applying to graduate school to continue his studies in mathematics!"
            email="nick.wharff@drake.edu"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
