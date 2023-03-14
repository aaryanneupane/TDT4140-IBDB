import React from "react";
import { useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';
import '../styles/adCard.css';
import { useNavigate, useParams } from "react-router-dom";

const AdCard= () => {

  const handleClick = () => {
    window.location.href = ad?.websiteURL;
  }  
  const { id } = useParams();
  const adID = typeof id === "string" ? id : '';
  const [ad, setAd] = useState<any>();
  const { imgURL } = useParams();

  useEffect(() => {
    let allAds: DocumentData[] = [];
          const adsCached = localStorage.getItem("ads");
          if (adsCached) {
              allAds = JSON.parse(adsCached);
          }
          const ad = allAds.find(ad => ad?.id === adID)
          setAd(ad);
    }
  )

  return (
    <div>
      <img src={ad?.imgURL} onClick={handleClick}/>
    </div>
  );
};

export default AdCard;
