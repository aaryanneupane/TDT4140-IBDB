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
        <div className="grid grid-cols-3">
            {books.map((book) => (
                <div className="border-4 ml-100">
                    <h1 className="text-xl ">Title: {book.title}</h1>
                    <img src={book.imgURL} width="200" height="300"/>
                </div>
            ))}
        </div>
    )
}

export default Book;