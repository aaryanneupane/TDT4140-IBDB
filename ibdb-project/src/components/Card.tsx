import React from "react";

function Card({
  title,
  bookIMG,
}: {
  title: string;
  bookIMG: string;
}) {

  return (
    <div
      tabIndex={0}
      className="card"
    >
      <img src={bookIMG} className='cursor-pointer'/>
    </div>
  );
}
export default Card;