import React from 'react';
import firebaseControl from '../firebaseControl';
import { useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { StarRating } from "star-rating-react-ts";
import { auth } from '../firebaseControl';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import '../styles/BookPage.css';



const BookPage = () => {

    const { id } = useParams();
    const bookID = typeof id === "string" ? id : '';

    const firebaseController = new firebaseControl();

    const [book, setBook] = useState<any>();
    const [allReviews, setAllReviews] = useState<DocumentData[]>([]);
    const [alreadyReviewed, setAlreadyReviewed] = useState<boolean>(false);
    const [userID, setUserID] = useState<string>("");
    const [rating, setRating] = useState<number>();
    const [userRating, setUserRating] = useState<number>();

    useEffect(() => {
        let allBooks: DocumentData[] = [];
        const booksCached = localStorage.getItem("books");
        if (booksCached) {
            allBooks = JSON.parse(booksCached);
        }
        const book = allBooks.find(book => book.id === bookID)
        setBook(book);

        let allReviews: DocumentData[] = [];
        const reviewsCached = localStorage.getItem("reviews");
        if (reviewsCached) {
            allReviews = JSON.parse(reviewsCached);
        }
        setAllReviews(allReviews);

        onAuthStateChanged(auth, (user: User | null) => {
            if (user && user.email) {
                setUserID(user.email);
                console.log("registeredUser", user.email);
            }
        });

        allReviews.forEach(review => {
            console.log("review user: ", review.userID)
            console.log("this userID: ", userID)
            if (review.userID === userID) {
                console.log("review: ", review.bookID)
                console.log("this bookID: ", bookID)
                if (review.bookID === bookID) {
                    setAlreadyReviewed(true);
                    setUserRating(review.rating);
                }
            }
        });


    }, [bookID]);

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

        function handleCommentSubmit () {

            const safeRating = rating ?? 0;

            firebaseController.addReview(bookID, commentText, 4, userID);
            console.log(bookID);
            console.log(commentText);
            console.log(safeRating);
            console.log(userID);
        };

        return (
            <div className="bottom w-full flex flex-col items-center justify-between ">
                {!alreadyReviewed ? 
                    <div>
                        <p>Rate this book</p>
                        <StarRating initialRating={rating} onClick={() => { setShowCommentInput(true); setRating(rating) }} />
                    </div>
                    :
                    <div>
                        <p> Your review of this book </p>
                        <StarRating readOnly={true} initialRating={userRating} />
                        <p className='error-message'> Change your review <u className="here">here</u> </p>
                    </div>}
                    
                {showCommentInput && (
                    <div className="flex flex-col justify-between items-center">
                        <textarea className="px-3 py-3 top mt-4 rounded-lg bg-hvit shadow-0 items-center  text-lg"
                            value={commentText}
                            onChange={handleCommentChange}
                            placeholder="Add a review to your rating"
                            cols={28}
                            style={{ height: 'auto', minHeight: '100px' }} />
                            {alreadyReviewed ?
                            <p className='error-message'> You've already reviewed this book </p> : null}
                        {commentText === "" ?
                            <button onClick={() => handleCommentSubmit()} className="text-base mt-2 px-5 py-1 rounded-lg bg-hvit shadow-0 hover:shadow-lg">
                                Submit without comment
                            </button>
                            :
                            <button onClick={() => handleCommentSubmit()} className="text-base mt-2 px-5 py-1 rounded-lg bg-hvit shadow-0 hover:shadow-lg">
                                Submit with comment
                            </button>
                        }
                    </div>
                )}
            </div>
        )
    }

    return (
        <body>
            <div className='left'>
                <img className='center' id="image" src={book?.imgURL} alt={book?.imgURL} />
                <div className='center' id="starRating">
                    <CommentForm />
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
                                <StarRating readOnly={true} initialRating={book?.rating} />
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
