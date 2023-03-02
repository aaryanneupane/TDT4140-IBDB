import { doc, setDoc } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import firebaseControl from '../firebaseControl';


const AddBookPage = () => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [releaseYear, setReleaseYear] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [imgURL, setImgURL] = useState<string>('');
    const [rating, setRating] = useState<number>(0);    

    const firebaseController = new firebaseControl();
    
    function addThisBook() {
        firebaseController.addBook(title, author, genre, releaseYear, description, imgURL, rating);
    }

    return (
        <div>
            <h1>
                This is AddBook
            </h1>
            <div>
                <input type="text" placeholder="Title" value={title} onChange={(event) => {setTitle(event.target.value)}}/>
            </div>
            <div>
                <input type="text" placeholder="Author" value={author}/>
            </div>
            <div>
                <input type="text" placeholder="Genre" value={genre}/>
            </div>
            <div>
                <input type="number" placeholder="Release Year" value={releaseYear}/>
            </div>
            <div>
                <input type="text" placeholder="Description" value={description}/>
            </div>
            <div>
                <input type="text" placeholder="Img URL" value={imgURL}/>
            </div>
            <div>
                <input type="number" placeholder="Rating" value={rating}/>
            </div>
            <button onClick={addThisBook}>
                Add book
            </button>
        </div>
    )
}

export default AddBookPage;