import React, { useCallback } from 'react';
import firebaseControl from '../firebaseControl';
import { useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { StarRating } from "star-rating-react-ts";
import '../styles/BookPage.css';




const BookPage = () => {

    const { id } = useParams();
    const bookID = typeof id === "string" ? id : '';
    const userEmail = localStorage.getItem('user')?.replace(/"/g, '');
    const firebaseController = new firebaseControl();

    const [book, setBook] = useState<any>();
    const [reviews, setReviews] = useState<DocumentData[]>([]);
    const [alreadyReviewed, setAlreadyReviewed] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [amountOfRatings, setAmountOfRatings] = useState<number>(0);
    const [reviewAdded, setReviewAdded] = useState(false);
    const [userRating, setUserRating] = useState<number>();
    const [showFullText, setShowFullText] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {

        let allBooks: DocumentData[] = [];
        const booksCached = localStorage.getItem("books");
        if (booksCached) {
            allBooks = JSON.parse(booksCached);
        }
        const book = allBooks.find(book => book.id === bookID)
        setBook(book);

        let allReviews: DocumentData[] = [];
        let thisBookReviews: DocumentData[] = [];
        const reviewsCached = localStorage.getItem("reviews");
        if (reviewsCached) {
            allReviews = JSON.parse(reviewsCached);
            thisBookReviews = allReviews.filter((review) => review.bookID == bookID);
        }
        setReviews(thisBookReviews);

        var sum = 0;
        var counter = 0;

        thisBookReviews.forEach(review => {
            const reviewUser = review.userID;
            sum += review.rating;
            counter++;
            if (reviewUser === userEmail) {
                setAlreadyReviewed(true);
                setUserRating(review.rating);
            }
        });

        setAverageRating(sum / counter);
        setAmountOfRatings(counter);

    }, [bookID]);


    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    }

    const maxChars = 250;
    const displayText = showFullText ? book?.description : book?.description.slice(0, maxChars) + "...";

    //Kode for når tekstboksen skrives i (passer på at den ekspanderer ettersom man skriver
    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    };

    function handleCommentSubmit() {

        if (userEmail) {

            firebaseController.addReview(bookID, commentText, rating, userEmail);
            console.log(bookID);
            console.log(commentText);
            console.log(rating);
            console.log(userEmail);
            setShowCommentInput(false);
            setReviewAdded(true);
        }
    };

    const handleRateBook = () => {
        if (!userEmail) {
            setErrorMessage("You need to be logged in to rate books");
        } else {
            setShowCommentInput(true);
        }
    }

    return (
        <div>
            <div className='left'>
                <img className='center image' src={book?.imgURL} alt={book?.imgURL} />
                <div className='center starRating'>
                    <div className="bottom w-full flex flex-col items-center justify-between ">
                        {alreadyReviewed ?
                            <div>
                                <p> Your review of this book </p>
                                <StarRating readOnly={true} initialRating={userRating} />
                                <p> Change your review <u className="here">here</u> </p>
                            </div>
                            :
                            <div>
                                {!reviewAdded ?
                                    <button className="px-6 py-3 rounded-xl bg-hvit shadow-0 hover:shadow-lg" onClick={() => handleRateBook()}>Rate this book</button>
                                    : null}
                                <p className="error-message">{errorMessage}</p>
                            </div>
                        }

                        {showCommentInput && (
                            <div className="flex flex-col justify-between items-center">
                                <StarRating initialRating={rating} onClick={(rating) => { setRating(rating) }} />
                                <textarea className="px-3 py-3 top mt-4 rounded-lg bg-hvit shadow-0 items-center  text-lg"
                                    value={commentText}
                                    onChange={handleCommentChange}
                                    placeholder="Add a review to your rating"
                                    cols={28}
                                    style={{ height: 'auto', minHeight: '100px' }} />
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
                        {reviewAdded ?
                            <div>
                                <p> Your review of this book </p>
                                <StarRating readOnly={true} initialRating={rating} />
                                <p> Change your review <u className="here">here</u> </p>
                            </div> : null}

                    </div>
                    <div className="reviewSection">
                        <p className="info"></p>

                    </div>
                </div>
            </div>
            <div className='right'>
                <div className="title">
                    <p className='text-4xl'>{book?.title}</p>
                </div>
                <div className="author">
                    <p>{book?.author}</p>
                </div>
                <div>
                    <ul className="rating">
                        <li className="rating">
                            {book && (
                                <StarRating readOnly={true} initialRating={averageRating} />
                            )}
                        </li>
                        <li className="rating">
                            {averageRating} / 5
                        </li>
                    </ul>
                    <div className="amountOfRatings">
                        {amountOfRatings} ratings
                    </div>
                </div>
                <div className="center" id='description'>
                    <p>
                        {displayText}
                    </p>
                    <button className="genre" onClick={toggleShowFullText}>
                        {showFullText ? "Show less" : "Show more"}
                    </button>
                </div>
                <ul className='info'>
                    <li className='info'>Genre: &emsp; &emsp; &emsp; &ensp; &nbsp; {book?.genre}</li>
                    <li className='info'>Release Year: &emsp; &nbsp; &nbsp; {book?.releaseYear}</li>
                </ul>
            <div className="reviewSection">
                <p className='text-2xl'>User Reviews</p>
                {reviews.map((review) => (
                    <div className="commentBox">
                    {review.userID!== userEmail ?
                    <div>
                        <StarRating readOnly={true} initialRating={review.rating} />
                        <p>{review.comment}</p>
                        <p> Reviewed by {review.userID.split("@")[0]}</p>
                    </div> : null}
                    <div>
                    {userEmail == 'admin@gmail.com' && review.userID!= 'admin@gmail.com'? 
                    
                    <button className="px-6 py-3 rounded-xl bg-hvit shadow-0 hover:shadow-lg"> Delete Review </button> : null}
                    </div>
                    </div>
                ))}
            </div>
            </div>
            {/* Nedre div for kommentarer/rating */}
            {/* <div className="bottom ml-20">
                    <CommentForm/>
                    <div className="reviewSection">
                        <h2>Previous reviews</h2>
                        <text name="review" className="info"></text>
                    </div>
            </div> */}
        </div>
    )
}

export default BookPage;
