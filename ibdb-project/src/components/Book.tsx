import React, {useEffect, useLayoutEffect, useState} from 'react';
import 'firebase/firestore';
import firebaseControl from '../firebaseControl';
import { IBook } from './IBook';


const Book = () => {


    const firebaseController = new firebaseControl();
    const [books, setBooks] = useState<IBook[]>([]);
    
    useEffect(() => {
        firebaseController.getBooks().then(books => setBooks(books))

        return

    }, [])


    console.log(books);


    return (
        <div>
            {books.map((book) => (
                <div>
                    <h1 className="text-4xl ">Title: {book.title}</h1>
                    <p>Author: {book.author}</p>
                    <p>Description: {book.description}</p>
                    <p>Release year: {book.releaseYear}</p>
                    <p>Rating: {book.rating}</p>
                    <p>Genre: {book.genre}</p>
                </div>
            ))}
        </div>
    )
}

export default Book;