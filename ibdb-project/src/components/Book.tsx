import React, {useEffect, useLayoutEffect, useState} from 'react';
import 'firebase/firestore';
import firebaseControl from '../firebaseControl';
import { useNavigate } from 'react-router-dom';
import { DocumentData, query } from 'firebase/firestore';

import { IBook } from './IBook';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';


const Book = () => {


    const firebaseController = new firebaseControl();
    const [books, setBooks] = useState<DocumentData[]>([]);
    const[bookId, setBookId] = useState<string[]>([])
    const [query, setQuery] = useState<any>()
    
    useEffect(() => {
        firebaseController.getBooks().then(books => setBooks(books))
        firebaseController.hello().then(bookId => setBookId(bookId))
        firebaseController.sendQuery().then(query => setQuery(query))

        return

    }, [])

    const navigate = useNavigate();

    const bookIDs = firebaseController.getBookIds();
    console.log(bookIDs);

    const q = firebaseController.sendQuery();


    // bookId.map((id) => (
    //     console.log(id)
    // ))

    // const book = q.then((snapshot) => {
    //     snapshot.docs.map( doc => doc.data());
    // }, [])

    async function getBookData() {
        const snapshot = await q;
        return Array.from(snapshot.docs, (doc) => doc.data());
      }
      
    async function renderBooks() {
        const book = await getBookData();
        return book;
    };


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