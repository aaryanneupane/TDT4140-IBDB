import React from "react";
import { useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';
import '../styles/HomePage.css';

function AdCard ({
  websiteURL,
  imgURL,
} : {
  imgURL: string;
  websiteURL: string;
}) {

  const handleClick = () => {
    window.open(websiteURL);
  }

  return (
    <div className = "adCard">
      <div className="adText">
        <p>Advertisement</p>
      </div>
      <div className="adImage">
        <img src={imgURL} className='cursor-pointer' onClick={handleClick}/>
      </div>
    </div>
  );
};

export default AdCard;