import React, { useEffect, useLayoutEffect, useState } from 'react';

import { Routes, Route } from "react-router-dom";
import BookPage from './pages/BookPage';
import AddAdPage from './pages/AddAdPage';
import HomePage from './pages/HomePage';
import MyBookLists from './pages/MyBookLists';
import RatedBooks from './pages/RatedBooks';
import AddBookPage from './pages/AddBookPage';
import Header from './components/Header';
import Filter from './components/Filter';
import firebaseControl from './firebaseControl';
import { DocumentData } from 'firebase/firestore';
import DarkModeHandler from './components/DarkModeHandler';

function App() {

  const firebaseController = new firebaseControl();

  useEffect(() => {

    let allBooks: DocumentData[] = [];
    const booksCached = localStorage.getItem("books");
    if (!booksCached) {
      firebaseController.getBooks().then((orgBooks) => {
        allBooks = orgBooks;
      });
      localStorage.setItem('books', JSON.stringify(allBooks))
    }
    const unsubscribeBooks = firebaseController.listenForCollectionChanges('books', (updatedBooks: DocumentData[]) => {
      localStorage.setItem('books', JSON.stringify(updatedBooks));
    });

    let allReviews: DocumentData[] = [];
    const reviewsCached = localStorage.getItem("reviews");
    if (!reviewsCached) {
      firebaseController.getReviews().then((orgReviews) => {
        allReviews = orgReviews;
      });
      localStorage.setItem('reviews', JSON.stringify(allReviews))
    }
    const unsubscribeReviews = firebaseController.listenForCollectionChanges('reviews', (updatedReviews: DocumentData[]) => {
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));

      let booksToChangeRating: DocumentData[] = [];
      const booksCached = localStorage.getItem("books");
      if (booksCached) {
          booksToChangeRating = JSON.parse(booksCached);
      }
      booksToChangeRating.forEach(book => {
        var sum = 0;
        var counter = 0;

        updatedReviews.forEach(review => {
            if (book.id === review.bookID) {
              sum += review.rating;
              counter++;
            }
          });
        if (counter === 0) {
            book.rating = 0;
        } else {
            book.rating = Number((sum / counter).toFixed(1));
        }
        console.log(book.rating)
      });
      localStorage.setItem('books', JSON.stringify(booksToChangeRating))

    });

    let allAds: DocumentData[] = [];
    const adsCached = localStorage.getItem("ads");
    if (!adsCached) {
      firebaseController.getAds().then((orgAds) => {
        allAds = orgAds;
      });
      localStorage.setItem('ads', JSON.stringify(allAds))
    }
    const unsubscribeAds = firebaseController.listenForCollectionChanges('ads', (updatedAds: DocumentData[]) => {
      localStorage.setItem('ads', JSON.stringify(updatedAds));
    });

    return () => {
      unsubscribeBooks();
      unsubscribeReviews();
      unsubscribeAds();
    }

  }, []);

  return (
    <DarkModeHandler>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="bookPage/:id" element={<BookPage />} />
          <Route path="myBookLists" element={<MyBookLists />} />
          <Route path="filteredBooks" element={<Filter />} />
          <Route path="ratedBooks" element={<RatedBooks />} />
          <Route path="addBook" element={<AddBookPage />} />
          <Route path="addAd" element={<AddAdPage />} />
       
        </Routes>
      </div>
    </DarkModeHandler>
  );
}

export default App;

