import React, { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Card from "./Card";
import { DocumentData } from "firebase/firestore";

const ScrollingMenu = ({user}: {user: string} ) => {

  const [books, setBooks] = useState<DocumentData[]>([]);
  const [userLists, setUserLists] = useState<DocumentData>();
  const [userList, setUserList] = useState<DocumentData | null | undefined>();
  const [listName, setListName] = useState<DocumentData[]>([]);


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
      setUserLists(allCustomLists.filter((list) => { list.userID === user }))
    }
    setListName(userLists?.list1[0]);
    setUserList(userList?.list1);
    let cards: DocumentData[] = [];
    books.forEach(book => {
        userList.forEach(bookID => {
            if (book.id === bookID) {
                cards.push(book);
            }
        })
    });

    
  });
  
  return (
    <div>
      {/* create scrolling menu */}
      <ScrollMenu>
        <div className="scrollingmenu">
          {cards.map((card) => 
            <Card 
              title={card.title}
              bookIMG= {card.imgURL}
              id= {card.id}
              key={card.id}/>
          )}
        </div>
      </ScrollMenu>
    </div>
  );
}
export default ScrollingMenu;