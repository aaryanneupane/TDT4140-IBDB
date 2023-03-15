import React from "react";
import { useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';
import '../styles/AdCard.css';

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
    <div>
      <p>Advertisement</p>
      <div className="adCard">
      <img src={imgURL} className='cursor-pointer' onClick={handleClick}/>
      </div>
    </div>
  );
};

export default AdCard;