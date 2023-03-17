import '../styles/HomePage.css';

function CardForAd ({
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
      <p>Advertisement</p>
      <div className="adImage">
        <img src={imgURL} className='cursor-pointer' onClick={handleClick}/>
      </div>
    </div>
  );
};

export default CardForAd;