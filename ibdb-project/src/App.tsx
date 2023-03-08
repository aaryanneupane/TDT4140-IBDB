import React, { useEffect, useLayoutEffect, useState } from 'react';

import { Routes, Route } from "react-router-dom";
import BookPage from './pages/BookPage';
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
    const unsubscribe = firebaseController.listenForBookChanges((updatedBooks: DocumentData[]) => {
      localStorage.setItem('books', JSON.stringify(updatedBooks));
    });

    return () => {
      unsubscribe();
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
        </Routes>
      </div>
    </DarkModeHandler>
  );
}

export default App;

