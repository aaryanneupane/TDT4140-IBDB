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
    

    //
    function CommentForm() {                            //Huske å sette denne false!
      const [showCommentInput, setShowCommentInput] = useState(true);
      const [commentText, setCommentText] = useState("")

      //Kode for når tekstboksen skrives i (passer på at den ekspanderer ettersom man skriver
      const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
      };

      const handleCommentSubmit = () => {
        //Code for when submit button is clicked
      };

      return(
        <div className = "bottom w-full flex items-center justify-between ">
            <div className = "bottom left w-1/4 items-center">
             <button onClick={() => setShowCommentInput(!showCommentInput)} className=" px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg ml-12">Review this book</button>
            </div>       {showCommentInput && (
                    <div className = "flex w-5/6 justify-between pr-20 items-center pr-40">
                        <StarRating />
                        <textarea className="px-6 py-3 top rounded-lg bg-hvit shadow-0 flex flex-col items-center w-3/6 text-lg"
                            value={commentText}
                            onChange={handleCommentChange}
                            placeholder="Comment here"
                            style={{ height: 'auto', minHeight: '100px' }}/>
                        <button onClick={handleCommentSubmit} className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg">Submit</button>
                    </div>
                  )}
        </div>
        )
    }
  

    
    return (
        <body>
            <div className='left'>
                <img className='center' id="image" src={book?.imgURL} alt={book?.imgURL}/>
                <div className='center' id="starRating">
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

            {/* Nedre div for kommentarer/rating */}
            <div className="bottom ml-20">
                    <CommentForm/>
            </div>
        </body>
    )
}

export default BookPage;
