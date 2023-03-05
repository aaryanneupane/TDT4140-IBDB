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

    //Get book for book page

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
    
    //"show more" functionality
    const [showFullText, setShowFullText] = useState(false);

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    }
    
    const maxChars = 250;
    const displayText = showFullText ? book?.description : book?.description.slice(0, maxChars) + "...";

    function CommentForm() {                           
      const [showCommentInput, setShowCommentInput] = useState(false);
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
        <div className = "bottom w-full flex flex-col items-center justify-between ">
            <StarRating onClick={() => setShowCommentInput(!showCommentInput)}/>
            {showCommentInput && (
                <div className = "flex flex-col justify-between items-center">
                    <textarea className="px-3 py-3 top mt-4 rounded-lg bg-hvit shadow-0 items-center  text-lg"
                        value={commentText}
                        onChange={handleCommentChange}
                        placeholder="Add a review to your rating"
                        cols={28}
                        style={{ height: 'auto', minHeight: '100px'}}/>
                            <div className = "items-center ">
                                <button onClick={() => handleCommentSubmit()} className="text-base mt-2 px-5 py-1 rounded-lg bg-hvit shadow-0 hover:shadow-lg">
                                    Submit review
                                </button>
                            </div>
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
                    <CommentForm/>
                    <div id="reviewSection">
                        <text name="review" id="info"></text>
           
                    </div> 
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
                    </ul>
                    <div id="rating">
                            1,4M ratings
                    </div>
                </div>
                <div className="center" id='description'>
                    <p>
                        {displayText}
                    </p>
                    <button id="genre" onClick={toggleShowFullText}>
                        {showFullText ? "Show less" : "Show more"}
                    </button>
                </div>        
                <ul id='info'>
                    <li id='info'>Genre: &emsp; &emsp; &emsp; &ensp; &nbsp; {book?.genre}</li>
                    <li id='info'>Release Year: &emsp; &nbsp; &nbsp; {book?.releaseYear}</li>
                </ul>
            </div>

            {/* Nedre div for kommentarer/rating */}
            {/* <div className="bottom ml-20">
                    <CommentForm/>
                    <div id="reviewSection">
                        <h2>Previous reviews</h2>
                        <text name="review" id="info"></text>
                    </div>
            </div> */}
        </body>
    )
}

export default BookPage;
