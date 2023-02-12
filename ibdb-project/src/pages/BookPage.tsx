import React from 'react';
import Book from '../components/Book';
import { IBook } from '../components/IBook'
import firebaseControl from '../firebaseControl';
import firebase from 'firebase/compat';
import { useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';


const BookPage = () => {

    const firebaseController = new firebaseControl();
    const [books, setBooks] = useState<DocumentData[]>([]);

    useEffect(() => {
        firebaseController.getBooks().then(books => setBooks(books))
      return
    }, [])

    return (
        <div>
            <div className="grid grid-cols">
                {books.map((book) => (
                    <div className="w-full sm:w-1 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-10 p-6 bg-white rounded-lg shadow-lg">
                    <img className="w-full h-64 sm:h-80 md:h-96 object-cover" src={book.imgURL} alt={book.title} />
                    <div className="mt-6">
                    <h2 className="text-2xl font-medium mt-4">{book.title}</h2>
                    <p className="text-gray-600 mt-2">by {book.author}</p>
                    <p className="text-gray-600 mt-4">{book.description}</p>
                    <p className="text-gray-600 mt-2">Rating: {book.rating}</p>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )




}

export default BookPage;