import React, {useEffect, useLayoutEffect, useState} from 'react';

import 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';
import firebaseControl from './firebaseControl';
import { log } from 'console';
import { Book } from './type';

const firebaseController = new firebaseControl();


function App() {

  const [books, setBooks] = useState<Book[]>([])
  
useEffect(() => {
    firebaseController.getBooks().then(books => setBooks(books))

    return

}, [])

console.log(books);

return (
 
    <div>
      <div>
        <h1>Books</h1>
      </div>
      { books[0] &&
        <div>
          <h1>Title: {books[0].title}</h1>
          <h1>Author: {books[0].author}</h1>
          <h1>Description: {books[0].description}</h1>
          <h1>Release year: {books[0].releaseYear}</h1>
          <h1>Rating: {books[0].rating}</h1>
          <h1>Genres: {books[0].genres[0]}, {books[0].genres[1]}</h1>
        </div>
      }
    </div>
  );
}

export default App;
