import React, { useEffect } from 'react'
import { useState } from 'react';
import firebaseControl from '../firebaseControl';
import '../styles/HomePage.css';
import { useNavigate } from 'react-router-dom';


const AddBookPage = () => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [releaseYear, setReleaseYear] = useState<number | undefined >();
    const [description, setDescription] = useState<string>('');
    const [imgURL, setImgURL] = useState<string>('');
    const [rating, setRating] = useState<number>(0);    
    const [buttonActive, setButtonActive] = useState<boolean>(false);

    // for ad: 
    const [advertiser, setAdvertiser] = useState<string>('');
    const [adimgURL, setadImgURL] = useState<string>('');
    const [WPURL, setWPURL] = useState<string>('');
    const [adButtonActive, setAdButtonActive] = useState<boolean>(false);
    const [adId, setadId] = useState<string>('');
    const [row, setRows] = useState<string>('');
    //
    
    
    const firebaseController = new firebaseControl();
    const navigate = useNavigate();
    
    
    async function addThisBook() {
        if (title.length > 0 && author.length > 0 && genre.length > 0 && description.length > 0 && imgURL.length > 0 && releaseYear !== undefined){
            await firebaseController.addBook(title, author, genre, releaseYear, description, imgURL, rating);
            setTitle('');
            setAuthor('');
            setGenre('');
            setReleaseYear(undefined);
            setDescription('');
            setImgURL('');
            
            //Navigate to the bookpage for the new book 
           const newBookId : number = (await firebaseController.findLength()) - 1 
            navigate(`/bookPage/${newBookId}`);
        }
    }

    async function addThisAd() {
        if (advertiser.length > 0 && adimgURL.length > 0 && WPURL.length > 0){
            await firebaseController.addAd(advertiser, adimgURL, WPURL, adId);
            setAdvertiser('');
            setWPURL('');
            setImgURL('');
            setadId("")

        //Navigate back to homepage
        navigate(`/`);
            
        }
    }
    
    //Control description are
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
        event.target.style.height = "16"; // reset the height to auto
        event.target.style.height = `${event.target.scrollHeight}px`; // set the height to the scroll height
      };
    
    
    //For books
    useEffect(() => {
        if (title.length > 0 && author.length > 0 && genre.length > 0 && description.length > 0 && imgURL.length > 0 && releaseYear !== undefined){
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }, [title, author, genre, description, imgURL, releaseYear]);

    // For ads
    useEffect(() => {
        if (advertiser.length > 0 && adimgURL.length > 0 && WPURL.length > 0 && row != undefined){
            setAdButtonActive(true);
        } else {
            setAdButtonActive(false);
        }
    }, [advertiser, adimgURL, WPURL, row]); //Nødvendig med egen useEffect for row?

    const genres = [
        { id: 1, genre: "Crime" },
        { id: 2, genre: "Fantasy" },
        { id: 3, genre: "Roman" },
        { id: 4, genre: "Cartoon" },
        { id: 5, genre: "Classic" },
        { id: 6, genre: "Historical" },
        { id: 7, genre: "Biography" }
    ];

    const rows = [
        { id: "1", rows: "First row" },
        { id: "2", rows: "Second row" },
        { id: "3", rows: "Third row" },
        { id: "4", rows: "Bottom row" },

    ];
    
    function handleGenreChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setGenre(event.target.value);
    }

    function handleRowChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedRow = event.target.value; 
        setRows(selectedRow);
        const selectedRowObject = rows.find(row => row.rows === selectedRow);
        console.log(selectedRowObject?.id);
        if (selectedRowObject) {
            setadId(selectedRowObject.id);
            }
    }
    
    return (
        <div className='w-full'>
            {/* Add books */}
            <div className="header mt-10">
                <div className="element "></div>
                    <h1>Add new book</h1>
                </div>
            <div className="px-8 py-4 grid gap-6 md:grid-cols-2 w-2/3 items-start mt-8">
                <div>
                    <label className="block mb-2 text-sm font-semibold">Title</label>
                    <input type="text" 
                        className="block w-full px-4 py-2 text-purple-700 bg-white rounded-full focus:border-teitTheme focus:ring-teitTheme focus:outline-none focus:ring focus:ring-opacity-40 shadow-0"
                        placeholder="Title" 
                        value={title} onChange={(event) => {setTitle(event.target.value)}}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-semibold">Author</label>
                    <input type="text" 
                        className="block w-full px-4 py-2 text-purple-700 bg-white rounded-full focus:border-teitTheme focus:ring-teitTheme focus:outline-none focus:ring focus:ring-opacity-40 shadow-0"
                        placeholder="Author" 
                        value={author} onChange={(event) => {setAuthor(event.target.value)}}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-semibold">Genre</label>
                    <select id ='genre-select' name ='genre' value={genre} onChange={handleGenreChange} 
                        className="block w-full px-4 py-2 text-purple-700 bg-white rounded-full focus:border-teitTheme focus:ring-teitTheme focus:outline-none focus:ring focus:ring-opacity-40 shadow-0">
                        {genres.map(el => <option key={el.id} value={el.genre} >{el.genre}</option>)}
                        <option value="" selected disabled hidden>Select Genre</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-semibold">Release Year</label>
                    <input 
                    id="releaseYear" 
                    type="number" 
                    placeholder="Release Year" 
                    className="block w-full px-4 py-2 text-purple-700 bg-white rounded-full focus:border-teitTheme focus:ring-teitTheme focus:outline-none focus:ring focus:ring-opacity-40 shadow-0" 
                    value = {releaseYear} onChange={(event) => {setReleaseYear(Number(event.target.value))}}/>
                </div>
                            <div>
                    <label className="block mb-2 text-sm font-semibold">Description</label>
                    <textarea
                        className="input-field block w-full px-4 py-2 text-purple-700 bg-white rounded-lg focus:border-teitTheme focus:ring-teitTheme focus:outline-none focus:ring-opacity-40 shadow-0 h-11"
                        placeholder="Description"
                        value={description}
                        onChange={handleInputChange}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-semibold">Image URL</label>
                    <input type="text" 
                        className="block w-full px-4 py-2 text-purple-700 bg-white rounded-full focus:border-teitTheme focus:ring-teitTheme focus:outline-none focus:ring focus:ring-opacity-40 shadow-0"
                        placeholder="Image URL" 
                        value={imgURL} onChange={(event) => {setImgURL(event.target.value)}}/>
                </div>                
                <div>
                    {buttonActive ? 
                        <div>
                            <label className="block mb-2 text-sm font-semibold">Ready to add the book!</label>
                            <button onClick={addThisBook} className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg">
                                Add book
                            </button>
                        </div>
                        : 
                        <div>
                            <label className="block mb-2 text-sm font-semibold">Fill out all fields to add the book to IBDb</label>
                            <button type="button" disabled className="px-6 py-3 rounded-lg shadow-0 bg-hvit">
                            Add book
                            </button>
                        </div>
                    }
                </div>
            </div>     
         {/*Add advertisements*/}

         <div className="header mt-10">
                <div className="element "></div>
                    <h1>Add new advertisement</h1>
                </div>

            <div className="px-8 py-4 grid gap-6 md:grid-cols-2 w-2/3 items-start mt-8">
                <div>
                    <label className="block mb-2 text-sm font-semibold">Name of advertiser</label>
                    <input type="text" 
                        className="block w-full px-4 py-2 text-purple-700 bg-white rounded-full focus:border-teitTheme focus:ring-teitTheme focus:outline-none focus:ring focus:ring-opacity-40 shadow-0"
                        placeholder="Name of advertiser" 
                        value={advertiser} onChange={(event) => {setAdvertiser(event.target.value)}}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-semibold">Website URL</label>
                    <input type="text" 
                        className="block w-full px-4 py-2 text-purple-700 bg-white rounded-full focus:border-teitTheme focus:ring-teitTheme focus:outline-none focus:ring focus:ring-opacity-40 shadow-0"
                        placeholder="Website URL" 
                        value={WPURL} onChange={(event) => {setWPURL(event.target.value)}}/>
                </div>                
                <div>
                    {/* trinn for radvalg */}
                    <label className="block mb-2 text-sm font-semibold">Row in homepage</label>
                    <select id ='rows-select' name ='rows' value={row} onChange={handleRowChange} 
                        className="block w-full px-4 py-2 text-purple-700 bg-white rounded-full focus:border-teitTheme focus:ring-teitTheme focus:outline-none focus:ring focus:ring-opacity-40 shadow-0">
                        {rows.map(el => <option key={el.id} value={el.rows} >{el.rows}</option>)} 
                        <option value="" selected disabled hidden>Select row</option>
                    </select>
                </div>       
                <div>
                    <label className="block mb-2 text-sm font-semibold">Image URL</label>
                    <input type="text" 
                        className="block w-full px-4 py-2 text-purple-700 bg-white rounded-full focus:border-teitTheme focus:ring-teitTheme focus:outline-none focus:ring focus:ring-opacity-40 shadow-0"
                        placeholder="Image URL" 
                        value={adimgURL} onChange={(event) => {setadImgURL(event.target.value)}}/>
                </div> 

                <div>
                    {adButtonActive ? 
                        <div>
                            <label className="block mb-2 text-sm font-semibold">Ready to add your ad!</label>
                            <button onClick={addThisAd} className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg">
                                Add advertisement
                            </button>
                        </div>
                        : 
                        <div>
                            <label className="block mb-2 text-sm font-semibold">Fill out all fields to add your advertisement</label>
                            <button type="button" disabled className="px-6 py-3 rounded-lg shadow-0 bg-hvit">
                            Add advertisement
                            </button>
                        </div>
                    }
                </div>
            </div>
        
        </div>
        
        
        
    
        
    )
}


export default AddBookPage;