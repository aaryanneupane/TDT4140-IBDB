import React, {useEffect, useState} from 'react';
import 'firebase/firestore';
import firebaseControl from '../firebaseControl';
import { useNavigate } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore';
import 'firebase/compat/firestore';


const Book = () => {


    const firebaseController = new firebaseControl();
    const [books, setBooks] = useState<DocumentData[]>([]);
    
    useEffect(() => {
        firebaseController.getBooks().then(books => setBooks(books))

        return

    }, [])

    const navigate = useNavigate();

    return (
        <div>
            <h1 className="text-6xl text-center">New Books</h1>
            <div className="grid grid-cols-3">
            {books.map((book) => (
                    <div className="grid place-items-center border-4 ml-100">
                        <h1 className="text-xl">Title: {book.title}</h1>
                        <img src={book.imgURL} width="200" height="300" className='cursor-pointer' onClick={ () => navigate(`bookPage/${book.id}`)}/>
                        <button type="button" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
                            Legg til i favoritter
                        </button>
                    </div>
                
                ))}
            </div>
        </div>
    )
}

export default Book;