import React from 'react';
import firebaseControl from '../firebaseControl';
import { useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useParams } from 'react-router-dom';


const BookPage = () => {

    const { id } = useParams();
    const bookId = typeof id === "string" ? id : '';

    const firebaseController = new firebaseControl();
    const [book, setBook] = useState<any>();


    useEffect(() => {
        let allBooks: DocumentData[] = [];
        const booksCached = localStorage.getItem("books");
        if (booksCached) {
          allBooks = JSON.parse(booksCached);  
        } else {
          firebaseController.getBooks().then((orgBooks) => {
            allBooks = orgBooks;
          });
          localStorage.setItem('books', JSON.stringify(allBooks))
        }
        const book = allBooks.find(book => book.id === bookId)
        setBook(book);
      
      }, [bookId]);


    return (
        <div>
            <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/3 mt-10 ml-20">
                    <img className="w-50 h-75 rounded-lg shadow-2xl object-cover" src={book?.imgURL} alt={book?.title} /> 
                </div>
                <div className="w-full sm:w-2/3 p-6 mr-40 ">
                    <h1 className="text-4xl font-serif font-bold mt-4">{book?.title}</h1>
                    <p className="text-gray-600 italic mt-2">{book?.author}</p>
                    <p className="text-gray-600 mt-2">Rating: {book?.rating}</p>
                    <p className="text-gray-600 mt-6">{book?.description}</p>
                </div>
            </div>
            <button type="button" className='bg-blue-500 hover:bg-blue-700 text-white ml-20 font-bold py-2 px-4 rounded-full'>
                            Legg til i favoritter
                        </button>
        </div>
    )

}

export default BookPage;