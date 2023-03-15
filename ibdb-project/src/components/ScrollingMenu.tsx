import React, { useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Card from "./Card";
import { DocumentData } from "firebase/firestore";
import AdCard from "./adCard";

const sortAndFilterBooks = (books: DocumentData[], filter: string) => {

  let sortedBooks = [...books];
  if (filter === "news") {
    sortedBooks = sortedBooks
      .filter(book => book.releaseYear <= 2023)
      .sort((b1, b2) => b2.releaseYear - b1.releaseYear);
  } else if (filter === "coming") {
    sortedBooks = sortedBooks
      .filter((book) => book.releaseYear > 2023);
  } else if (filter === "rated") {
    sortedBooks
      .sort((b1, b2) => b2.rating - b1.rating);
  } else if (filter === "added") {
    sortedBooks.sort((b1, b2) => b2.id - b1.id);
  }
  return sortedBooks.slice(0,10);
}

const ScrollingMenu = ({filter, adID}: {filter: string, adID: number} ) => {

  const [books, setBooks] = useState<DocumentData[]>([]);
  const [allAds, setAllAds] = useState<DocumentData[]>();

  useEffect(() => {
    let allBooks: DocumentData[] = [];
    let allAds: DocumentData[] = [];
    const booksCached = localStorage.getItem("books");
    if (booksCached) {
      allBooks = JSON.parse(booksCached);
    }
    const adsCached = localStorage.getItem("ads");
    if (adsCached) {
      allAds = JSON.parse(adsCached);
    }
    setAllAds(allAds);
    setBooks(sortAndFilterBooks(allBooks, filter));
  }, []);
  
    // create random index to insert advertisement card
    let cards: DocumentData[] = [];
    let ad: DocumentData | undefined = undefined;
    
    if (allAds) {
      const adIndex : number = Math.floor(Math.random() * 9); 
      let ad = allAds[adID];
    // create array of cards with advertisement card at random index
      cards = [...books.slice(0, adIndex), ad , ...books.slice(adIndex)];
      //console.log(cards);
    }


    return (
      <div>
        {/* create scrolling menu */}
        <ScrollMenu>
          <div className="scrollingmenu">
            {cards.map((card) => 
              card.advertiserName ?
              <AdCard 
                websiteURL={card?.websiteURL}
                imgURL={card?.imgURL}
                key={card?.id}
                /> : 
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