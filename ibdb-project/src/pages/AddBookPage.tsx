import { doc, setDoc } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import firebaseControl from '../firebaseControl';
import '../styles/HomePage.css';



const AddBookPage = () => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [releaseYear, setReleaseYear] = useState<number>(2000);
    const [description, setDescription] = useState<string>('');
    const [imgURL, setImgURL] = useState<string>('');
    const [rating, setRating] = useState<number>(0);    

    const firebaseController = new firebaseControl();
    
    function addThisBook() {
        firebaseController.addBook(title, author, genre, releaseYear, description, imgURL, rating);
        console.log("addThisBook");
    }

    return (
        <div className='items-center'>
            <div className="header mt-2">
                    <div className="element"></div>
                    <h1>Add new book</h1>
            </div>
            <div className="px-4 grid gap-6 md:grid-cols-2 w-2/3 items-center">

                <div>
                    <label className="block text-sm font-bold">Title</label>
                    <input type="text" 
                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Title" 
                        value={title} onChange={(event) => {setTitle(event.target.value)}}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm">Author</label>
                    <input type="text" 
                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Author" 
                        value={author} onChange={(event) => {setAuthor(event.target.value)}}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm">Genre</label>
                    <input type="text" 
                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Genre" 
                        value={genre} onChange={(event) => {setGenre(event.target.value)}}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm">Release Year</label>
                    <input type="number" 
                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Release Year" 
                        value={releaseYear} onChange={(event) => {setReleaseYear(Number(event.target.value))}}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm">Description</label>
                    <input type="text" 
                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Description" 
                        value={description} onChange={(event) => {setDescription(event.target.value)}}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm">Image URL</label>
                    <input type="text" 
                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Image URL" 
                        value={imgURL} onChange={(event) => {setImgURL(event.target.value)}}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm">Rating</label>
                    <input type="number" 
                        className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                        placeholder="Rating" 
                        value={rating} onChange={(event) => {setRating(Number(event.target.value))}}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm">Click when you are ready to add book</label>
                    <button onClick={addThisBook} className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg">
                        Add book
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddBookPage;