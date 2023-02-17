import React, {useEffect, useLayoutEffect, useState} from 'react';

import {Routes,Route } from "react-router-dom";
import BookPage  from './pages/BookPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyBookLists from './pages/MyBookLists';
import RatedBooks from './pages/RatedBooks';
import AddBookPage from './pages/AddBookPage';
import Header from './components/Header';
import Filter from './components/Filter';


function App() {

return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="bookPage/:id" element={ <BookPage/> } />
        <Route path="loginPage" element={ <LoginPage/> } />
        <Route path="myBookLists" element={ <MyBookLists/> } />
        <Route path="filteredBooks" element={ <Filter/>} />
        <Route path="ratedBooks" element={ <RatedBooks/> } />
        <Route path="addBook" element={ <AddBookPage/> } />
      </Routes>
    </div>
  );
}

export default App;

