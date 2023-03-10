import React from 'react';
import firebaseControl from '../firebaseControl';
import { useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { StarRating } from "star-rating-react-ts";
import '../styles/BookPage.css'

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
        }
        const book = allBooks.find(book => book.id === bookId)
        setBook(book);
      
      }, [bookId]);

    
    return (
        <div id="body">
            <div className='left'>
                <img className='center' id="image" src={book?.imgURL} alt={book?.imgURL}/>
                <div className='center' id="starRating">
                    <StarRating/>
                </div>
            </div>
            <div className='right'>
                <div id="title">
                    <p>{book?.title}</p>
                </div>
                <div id="author">
                    <p>{book?.author}</p>
                </div>
                <div>
                    <ul id="rating">
                        <li id="rating">                
                            {book && (
                                <StarRating readOnly={true} initialRating={book?.rating}/>
                            )}
                        </li>
                        <li id="rating">
                            {book?.rating} / 5
                        </li>
                        <li id="rating">
                            Number of ratings
                        </li>
                        <li id="rating">
                            -
                        </li>
                        <li id="rating">
                            Number of reviews
                        </li>
                    </ul>
                </div>
                <div className="center" id='description'>
                    {book?.description}
                </div>
                {/* <button id='showMoreButton'>
                    Show more...
                </button> */}
                <ul>
                    <li>
                        <ul id="rating">
                            <li id='rating'>Genre:</li>
                            <li id='rating'>{book?.genre}</li>
                        </ul>
                    </li>
                    {/* <li id="info">
                        Pages: &emsp; &emsp; &emsp; &emsp;398
                    </li>
                    <li id="info">
                        Format: &emsp; &emsp; &emsp; &nbsp; Hardcover
                    </li>
                    <li id="info">
                        First published &emsp; July 8, 1999
                    </li>
                    <li id="info">
                        Language: &emsp; &emsp; &nbsp; English
                    </li> */}
                </ul>
            </div>
        </div>
    )
}

export default BookPage;
