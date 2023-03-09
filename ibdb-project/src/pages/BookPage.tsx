import React, { MouseEventHandler, useCallback } from 'react';
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
    const [amountOfRatingsForBook, setAmountOfRatingsForBook] = useState<number>(0);
    const [reviewAdded, setReviewAdded] = useState(false);
    const [userReview, setUserReview] = useState<DocumentData>();
    const [reviewToDelete, setReviewToDelete] = useState<DocumentData>([]);
    const [hideReviewToDelete, setHideReviewToDelete] = useState(false);
    const [showFullText, setShowFullText] = useState(false);
    //const [showCommentInput, setShowCommentInput] = useState(false);
    const [visibleReviewPopup, setVisibleReviewPopup] = useState(false);
    const [visibleDeletePopup, setVisibleDeletePopup] = useState(false);
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
            sum += review.rating;
            counter++;
            if (review.userID === userEmail) {
                setAlreadyReviewed(true);
                setUserReview(review);
            }
        });

        setAverageRating(Number((sum / counter).toFixed(1)));
        setAmountOfRatingsForBook(counter);

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
            if (userReview) {
                firebaseController.deleteReview(userReview);
            }
            const review: DocumentData = {
                bookID: bookID,
                comment: commentText,
                rating: rating,
                userID: userEmail,
            };
            firebaseController.addReview(review);
            setUserReview(review);
            //setShowCommentInput(false);
            setVisibleReviewPopup(false);
            setAlreadyReviewed(false);
            setReviewAdded(true);
        }
    };

    const handleRateBook = () => {
        if (!userEmail) {
            setErrorMessage("You need to be logged in to rate books");
        } else {
            //setShowCommentInput(true);
            setVisibleReviewPopup(true);
        }
    }

    const handleHere = () => {
        setCommentText(userReview?.comment);
        setRating(userReview?.rating);
        setVisibleReviewPopup(true);
        // setShowCommentInput(true);
    }

    const closeOrOpen: MouseEventHandler<HTMLDivElement> = (e) => {
        const isClose = (e.target as HTMLElement).closest("#popup")
        if (!isClose) {
            setVisibleReviewPopup(false);
        }
    }

    const deleteReview = (review: DocumentData) => {
        setVisibleDeletePopup(true);
        setReviewToDelete(review);
    }

    const handleConfirm = () => {
        firebaseController.deleteReview(reviewToDelete);
        setVisibleDeletePopup(false);
        setVisibleReviewPopup(false);
        setAlreadyReviewed(false);
        setReviewAdded(false);
        setHideReviewToDelete(true);
    }

    return (
        <div>
            <div className='left'>
                <img className='center' id="image" src={book?.imgURL} alt={book?.imgURL} />
                <div className='center' id="starRating">
                    <div className="bottom w-full flex flex-col items-center justify-between ">
                        {alreadyReviewed ?
                            <div>
                                <p> Your review of this book </p>
                                <StarRating readOnly={true} initialRating={userReview?.rating} />
                                <p> Change your review <u className="here" onClick={handleHere}>here</u> </p>
                            </div>
                            :
                            <div>
                                {!reviewAdded ?
                                    <button className="px-6 py-3 rounded-xl bg-hvit shadow-0 hover:shadow-lg" onClick={() => handleRateBook()}>Rate this book</button>
                                    : null}
                                <p className="error-message">{errorMessage}</p>
                            </div>
                        }
                        {visibleReviewPopup ?
                            <div>
                                <div className="edit" onClick={closeOrOpen}>
                                    <div className="edit-inner" id="popup">
                                        <StarRating initialRating={rating} onClick={(rating) => { setRating(rating) }} />

                                        <textarea className="px-3 py-3 top mt-4 rounded-lg bg-hvit shadow-0 items-center  text-lg"
                                            value={commentText}
                                            onChange={handleCommentChange}
                                            placeholder="Add a review to your rating"
                                            cols={28}
                                            style={{ height: 'auto', minHeight: '100px' }} />
                                        <div className="flex">
                                        {commentText === "" ?
                                            <button onClick={() => handleCommentSubmit()} className="text-base mt-2 mr-10 px-5 py-1 rounded-lg bg-hvit shadow-0 hover:shadow-lg">
                                                Submit without comment
                                            </button>
                                            :
                                            <button onClick={() => handleCommentSubmit()} className="text-base mt-2 mr-10 px-5 py-1 rounded-lg bg-hvit shadow-0 hover:shadow-lg">
                                                Submit with comment
                                            </button>
                                        }
                                        {userReview ?
                                            <button onClick={() => deleteReview(userReview)} className="text-base mt-2 px-5 py-1 rounded-lg bg-kulTheme shadow-0 hover:shadow-lg">
                                                Delete review
                                            </button> : null
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div> : null
                        }
                        {reviewAdded ?
                            <div>
                                <p> Your review of this book </p>
                                <StarRating readOnly={true} initialRating={rating} />
                                <p> Change your review <u className="here" onClick={() => handleHere()}>here</u> </p>
                            </div> : null}

                    </div>
                    <div id="reviewSection">
                        <p id="info"></p>

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
                                <StarRating readOnly={true} initialRating={averageRating} />
                            )}
                        </li>
                        <li id="rating">
                            {averageRating} / 5
                        </li>
                    </ul>
                    <div id="rating">
                        {amountOfRatingsForBook} ratings
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
            {visibleDeletePopup ?
                <div>
                    <div className="edit" onClick={closeOrOpen}>
                        <div className="edit-inner" id="popup">
                            <p>Are you sure you want to delete this review? </p>
                            <button onClick={() => handleConfirm()} className="text-base mt-2 px-5 py-1 rounded-lg bg-hvit shadow-0 hover:shadow-lg">
                                Confirm
                            </button>
                            <button onClick={() => setVisibleDeletePopup(false)} className="text-base mt-2 px-5 py-1 rounded-lg bg-hvit shadow-0 hover:shadow-lg">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div> : null
            }
            <div className="pt-400">
                {reviews.map((review) => (
                    <div>
                        {review.userID !== userEmail && !hideReviewToDelete ?
                            <div className="bg-white width-200">
                                <p>{review.comment}</p>
                                <StarRating readOnly={true} initialRating={review.rating} />
                                <p> Reviewed by {review.userID.split("@")[0]}</p>
                            </div> : null}
                        <div>
                            {userEmail == 'admin@gmail.com' && review.userID != 'admin@gmail.com' && !hideReviewToDelete ?

                                <button className="px-6 py-3 rounded-xl bg-kulTheme shadow-0 hover:shadow-lg" onClick={() => deleteReview(review)}> Delete Review </button> : null}
                        </div>
                    </div>
                ))}
            </div>

            {/* Nedre div for kommentarer/rating */}
            {/* <div className="bottom ml-20">
                    <CommentForm/>
                    <div id="reviewSection">
                        <h2>Previous reviews</h2>
                        <text name="review" id="info"></text>
                    </div>
            </div> */}
        </div>
    )
}

export default BookPage;
