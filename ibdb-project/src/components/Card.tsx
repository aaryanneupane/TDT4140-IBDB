import React from "react";
import { useNavigate } from "react-router-dom";

function Card({
  title,
  id,
  bookIMG,
}: {
  title: string;
  bookIMG: string;
  id: string;
}) {

  const navigate = useNavigate();

  return (
    <div
      tabIndex={0}
      className="card"
    >
      <img src={bookIMG} className='cursor-pointer' onClick={ () => navigate(`bookPage/${id}`)}/>
    </div>
  );
}
export default Card;