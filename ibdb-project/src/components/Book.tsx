import React, {useEffect, useLayoutEffect, useState} from 'react';

import { Book } from './type';


const firebaseController = new firebaseControl();

const [books, setBooks] = useState<Book[]>([])
  
useEffect(() => {
    firebaseController.getBooks().then(books => setBooks(books))

    return

}, [])


console.log(books);


return (
    <div>
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

)