import React, { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Card from "./Card";
import firebaseControl from "../firebaseControl";
import { DocumentData } from "firebase/firestore";


const sortAndFilterBooks = (books: DocumentData[], filter: string) => {
  let sortedBooks = [...books];
  if (filter === "news") {
    sortedBooks
      .sort((b1, b2) => b2.releaseYear - b1.releaseYear);
  } else if (filter === "coming") {
    sortedBooks
      .sort((b1, b2) => b2.releaseYear - b1.releaseYear)
      .filter(book => book.releaseYear > 2023);
  } else if (filter === "rated") {
    sortedBooks
      .sort((b1, b2) => b2.rating - b1.rating);
  } else if (filter === "no") {
    //do nothing
  }
  return sortedBooks.slice(0,10);
}
const ScrollingMenu = (prop: { filter: string }) => {

  const [books, setBooks] = useState<DocumentData[]>([]);
  const firebaseController = new firebaseControl();

  useEffect(() => {
    const booksCached = localStorage.getItem("books");
    if (booksCached) {
      setBooks(sortAndFilterBooks(JSON.parse(booksCached), prop.filter))
    } else {
      firebaseController.getBooks().then((orgBooks) => {
        localStorage.setItem('books', JSON.stringify(orgBooks))
        setBooks(sortAndFilterBooks(orgBooks, prop.filter))
      });
      ;
    }
    
  }, []);

  return (
    <div>
      {/* create scrolling menu */}
      <ScrollMenu>
        {/* create card component for each item */}
        {books.map((book) => (
          <Card
            title={book.title}
            bookIMG={book.imgURL}
            id={book.id}
            key={book.id}
          />
        ))}
      </ScrollMenu>
    </div>
  );
}
export default ScrollingMenu;
