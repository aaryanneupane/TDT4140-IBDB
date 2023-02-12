import React, {useEffect, useLayoutEffect, useState} from 'react';
import 'firebase/firestore';
import firebaseControl from '../firebaseControl';
import { IBook } from './IBook';

interface Ifilter {
    filter: string;
};
//{filter} :Ifilter
const Filter = () => {

    const firebaseController = new firebaseControl();
    const [books, setBooks] = useState<IBook[]>([]);
    
    useEffect(() => {
        firebaseController.getBooks().then(books => setBooks(books))
    //     if (filter === "rating") {
    //         books.sort((book1, book2) => book1.rating - book2.rating);
    //     }
    //     else if (filter === "newest") {
    //         setBooks(books.sort((book1, book2) => book1.releaseYear - book2.releaseYear));
    //     }
    //     else if (filter === "genre") {
    //         setBooks(books.filter(book => book.genre === filter));
    //     }
        return
    }, []);

    console.log(books);


    // applyFilter(filter) {
    //     switch(filter) {
    //         case 'rating':
    //             return setBooks(books.sort((book1, book2) => book1.rating - book2.rating));
    //         case 'newest':
    //             return setBooks(books.sort((book1, book2) => book1.releaseYear - book2.releaseYear));
    //         case 'genre':
    //             return setBooks(books.filter(book => book.genre === filter));
    //     }
    // };


    return (
        <div>
            <h1 className="text-6xl text-center">New Books</h1>
            <div className="grid grid-cols-3">
                {books.filter(book => book.releaseYear === 1998).map((book) => (
                    <div className="grid place-items-center border-4 ml-100">
                        <h1 className="text-xl">Title: {book.title}</h1>
                        <img src={book.imgURL} width="200" height="300" className='cursor-pointer'/>
                        <button type="button" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
                            Legg til i favoritter
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filter;