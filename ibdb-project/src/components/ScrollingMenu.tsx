import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Card from "./Card";

//return a unique name/id for each item in the list (book + index)
const getId = (index: number) => `bok${index}`;

//return a list of 20 elements
const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

function ScrollingMenu() {
  //create items for the scrolling menu
  const [items] = React.useState(getItems);
  return (
    <div>
      {/* create scrolling menu */}
      <ScrollMenu>
        {/* create card component for each item */}
        {items.map(({ id }) => (
          <Card
            title = {"Spare"}
            bookIMG = {"https://upload.wikimedia.org/wikipedia/en/6/69/Spare_cover.jpg"}
            key = {id}
          />
        ))}
      </ScrollMenu>
    </div>
  );
}
export default ScrollingMenu;
