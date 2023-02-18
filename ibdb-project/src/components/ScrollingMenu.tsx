import React, { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Card from "./Card";
import firebaseControl from "../firebaseControl";
import { DocumentData } from "firebase/firestore";


const ScrollingMenu = (prop: { filter: string }) => {

  const [books, setBooks] = useState<DocumentData[]>([]);
  const firebaseController = new firebaseControl();

  useEffect(() => {
    firebaseController.getBooks().then((orgBooks) => {
      if (prop.filter === "news") {
        setBooks(orgBooks
          .sort((b1, b2) => b2.releaseYear - b1.releaseYear)
          .slice(0,10));
      } else if (prop.filter === "coming") {
        setBooks(orgBooks
          .sort((b1, b2) => b2.releaseYear - b1.releaseYear)
          .filter(book => book.releaseYear > 2023)
          .slice(0,10));
      } else if (prop.filter === "rated") {
        setBooks(orgBooks.sort((b1, b2) => b2.rating - b1.rating)
        .slice(0,10));
      } else if (prop.filter === "no") {
        setBooks(orgBooks.slice(0,10));
      }
  });
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
