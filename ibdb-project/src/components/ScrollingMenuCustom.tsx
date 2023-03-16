import React, { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Card from "./Card";
import { DocumentData } from "firebase/firestore";

const ScrollingMenu = ({ user, list }: { user: string, list: string }) => {

  const [books, setBooks] = useState<DocumentData[]>([]);
  const [allLists, setAllLists] = useState<DocumentData[]>([]);
  const [visible, setVisible] = useState(true);


  const userEmail = localStorage.getItem('user')?.replace(/"/g, '');

  useEffect(() => {
    let allBooks: DocumentData[] = [];
    const booksCached = localStorage.getItem("books");
    if (booksCached) {
      allBooks = JSON.parse(booksCached);
      setBooks(allBooks)
    }

    let allCustomLists: DocumentData[] = [];
    const customListsCached = localStorage.getItem("customLists");
    if (customListsCached) {
      allCustomLists = JSON.parse(customListsCached);
      setAllLists(allCustomLists);
    }
  }, []);


  const userList = allLists.find((list) => list.userID.trim() === userEmail);
  let name: string = '';
  let mylist: DocumentData[] = [];

  if(userList){
    console.log('hei');
    console.log(userList[0].id);
  }

  if (userList) {
    mylist = userList[list];
    if (mylist){
      name = JSON.stringify(mylist[0]).replace(/"/g, '');
    }
  }
  let cards: DocumentData[] = [];

  if (mylist){
    for (const id of mylist) {
      const book = books.find((book) => book.id === id);
      if (book) {
        cards.push(book);
      }
    }
  }
  

  return (
    <div>
    {mylist ? 
      <div>
        <div className="conteiner" id="RATI">
          <div className="header">
            <div className="element"></div>
            <h1>{name}</h1>
          </div>
            <ScrollMenu>
              <div className="scrollingmenu">
                {cards?.map((card) =>
                  <Card
                    title={card.title}
                    bookIMG={card.imgURL}
                    id={card.id}
                    key={card.id} />
                )}
              </div>
            </ScrollMenu>
          </div>
        </div>
    : null}
  </div>
  );
}
export default ScrollingMenu;