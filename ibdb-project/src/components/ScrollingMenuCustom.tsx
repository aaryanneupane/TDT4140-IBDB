import React, { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Card from "./Card";
import { DocumentData } from "firebase/firestore";

const ScrollingMenu = ({ user, list }: { user: string, list: string }) => {

  const [books, setBooks] = useState<DocumentData[]>([]);
  const [thisUserList, setThisUserList] = useState<DocumentData>();
  const [allLists, setAllLists] = useState<DocumentData[]>([]);
  const [listName, setListName] = useState('');

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

  // for (const customList of allLists) {

  //   if (customList.userID.trim() === userEmail) {
  //     const userList = customList.list1;
  //   }
  // }
  
  // setListName(thisUserList[0]);

  const userList = allLists.find((list) => list.userID.trim() === userEmail);
  let name: string = '';
  let mylist: DocumentData[] = [];
  if (userList) {
    mylist = userList.list1;
    name = JSON.stringify(mylist[0]).replace(/"/g, '');
    console.log(mylist);
  }
  let cards: DocumentData[] = [];

    for (const id of mylist) {
      console.log(id);
      const book = books.find((book) => book.id === id);
      console.log(book);
      if (book) {
        cards.push(book);
      }
    }
    // let counter = 1;
    // console.log(list);
    // for (const book of books){
    //   console.log(list[counter]);
    //   if (list[counter] == book.bookID) {
    //     console.log(book);
    //     cards.push(book);
    //   }
    //   counter++;
    // }



  // setListName(userLists?.list1[0]);
  // // setUserList(userList?.mylist1);
  // let cards: DocumentData[] = [];
  // // books.forEach(book => {
  // //     userList?.forEach(bookID => {
  // //         if (book.id === bookID) {
  // //             cards.push(book);
  // //         }
  // //     })
  // // });

  return (
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
  );
}
export default ScrollingMenu;