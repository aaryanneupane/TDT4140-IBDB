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


const getBook = () => {

    const firebaseController = new firebaseControl();
    const [books, setBooks] = useState<DocumentData[]>([]);
    const navigate = useNavigate();
    const bookIDs = firebaseController.getBookIds();

    return (
        <div>
            {books.map((book) => (
            <div>
                <h1 className="text-xl">Title: {book.title}</h1>
                <img src={book.imgURL} width="200" className='cursor-pointer' onClick={ () => navigate(`bookPage/${book.id}`)}/>
                <button type="button" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
                    Legg til i favoritter
                </button>
            </div>
            ))}
        </div>
    )
}

export default getBook;