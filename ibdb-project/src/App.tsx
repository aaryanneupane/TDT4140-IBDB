import React, {useEffect, useLayoutEffect, useState} from 'react';

import {Routes,Route } from "react-router-dom";
import BookPage  from './pages/BookPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyBookLists from './pages/MyBookLists';
import RatedBooks from './pages/RatedBooks';
import AddBookPage from './pages/AddBookPage';

import 'firebase/firestore';
import firebaseControl from './firebaseControl';
import { IBook } from './components/IBook';

// const firebaseController = new firebaseControl();


function App() {

//   const [books, setBooks] = useState<Book[]>([])
  
// useEffect(() => {
//     firebaseController.getBooks().then(books => setBooks(books))

//     return

// }, [])

// console.log(books);

return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="bookPage/:id" element={ <BookPage/> } />
        <Route path="loginPage" element={ <LoginPage/> } />
        <Route path="myBookLists" element={ <MyBookLists/> } />
        <Route path="ratedBooks" element={ <RatedBooks/> } />
        <Route path="addBook" element={ <AddBookPage/> } />
      </Routes>
    </div>
  );
}

export default App;
