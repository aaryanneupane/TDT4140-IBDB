import React from "react";

interface adCardProps {
  // id: string;
  // adIMG: string;
  // title: string;
}


const adCard: React.FC<adCardProps> = ({ }) => {
  return (
    <div>
      <h3>This is an advertisement card!</h3>
      <p>Advertisement ID: {}</p>
      <img src="https://gitlab.stud.idi.ntnu.no/uploads/-/system/project/avatar/16412/Markdown-mark.svg.png"/>
      {/* Add your advertisement content here */}
    </div>
  );
};

export default adCard;
