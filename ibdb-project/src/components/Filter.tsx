import React, { useEffect, useLayoutEffect, useState } from 'react';
import 'firebase/firestore';
import firebaseControl from '../firebaseControl';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IBook } from './IBook';
import { DocumentData } from 'firebase/firestore';
import Header from './Header';


const Filter = () => {

    const firebaseController = new firebaseControl();
    const [books, setBooks] = useState<DocumentData[]>([]);

    const { filter } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        firebaseController.getBooks().then(books => setBooks(books))
        return
    }, []);

    const [genreClicked, setGenreClicked] = useState(false);

    const handleGenre = () => {
        setGenreClicked(!genreClicked);
    };

    const [fictionChosen, setFictionChosen] = useState(false);
    const [romanChosen, setRomanChosen] = useState(false);
    const [crimeChosen, setCrimeChosen] = useState(false);

    const handleFictionChosen = () => {
        setFictionChosen(!fictionChosen);
        setBooks(books.filter(book => book.genre === "Fiction"));
    };

    const handleRomanChosen = () => {
        setRomanChosen(!romanChosen);
        setBooks(books.filter(book => book.genre === "Roman"));
    };

    const handleCrimeChosen = () => {
        setCrimeChosen(!crimeChosen);
        setBooks(books.filter(book => book.genre === "Crime"));
    };

    const [clickedYear, setClickedYear] = useState(false);

    const handleYear = () => {
        setClickedYear(!clickedYear);
    };

    const [sort, setSort] = useState(false);

    const handleSort = () => {
        setSort(!sort);
    };

    const handleNewest = () => {
        setBooks(books.sort((book1, book2) => book2.releaseYear - book1.releaseYear));
    }

    const handleRated = () => {
        setBooks(books.sort((book1, book2) => book2.rating - book1.rating));
    }

    return (
        <div>
            <div className="navbar navbar-expand-lg shadow-md pb-5 px-10 bg-bigBoy relative flex items-center w-full justify-center space-x-10">
                <p>Filtere: </p>
                <div className="space-y-2 relative bg-current">
                    <button onClick={handleGenre} className="px-5 py-2 rounded-lg bg-hvit shadow">
                        Sjanger
                        <img className="drop-down" src="/public/images/drop-down.png"/>
                    </button>
                    {genreClicked ?
                        <div className='navbar navbar-expand-lg absolute space-y-3 bg-current'>
                            <button onClick={handleFictionChosen}>
                                <Link to="/filteredBooks" className="px-5 py-2 rounded-lg bg-hvit shadow" >Fiction</Link>
                            </button>
                            <button onClick={handleCrimeChosen}>
                                <Link to="/filteredBooks" className="px-5 py-2 rounded-lg bg-hvit shadow" >Crime</Link>
                            </button>
                            <button onClick={handleRomanChosen}>
                                <Link to="/filteredBooks" className="px-5 py-2 rounded-lg bg-hvit shadow" >Roman</Link>
                            </button>
                        </div>
                        : null}
                </div>

                <div className="space-y-2 relative bg-current">
                    <button onClick={handleYear} className="px-5 py-2 rounded-lg bg-hvit shadow">
                        Utgivelsesår
                    </button>
                    {clickedYear ?
                        <div className='navbar navbar-expand-lg absolute space-y-3 bg-current'>
                            <input type="number" placeholder="Fra" className="px-3 py-2 rounded-lg bg-hvit shadow" />

                            <input type="number" placeholder="Til" className="px-3 py-2 rounded-lg bg-hvit shadow" />

                        </div>
                        : null}
                </div>
                <div className="space-y-2 relative bg-current">

                    <button onClick={handleSort} className="px-5 py-2 rounded-lg bg-hvit shadow">
                        Sorter etter
                    </button>
                    {sort ?
                        <div className='navbar navbar-expand-lg absolute space-y-3 bg-current'>
                            <button onClick={handleRated}>
                                <Link to="/filteredBooks" className="px-3 py-2 rounded-lg bg-hvit shadow" >Høyest Rated</Link>
                            </button>
                            <button onClick={handleNewest}>
                                <Link to="/filteredBooks" className="px-5 py-2 rounded-lg bg-hvit shadow" >Nyeste</Link>
                            </button>
                        </div>
                        : null}
                </div>
                <div>
                    {fictionChosen ?
                        <button className="px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'>Fiction X</p>
                        </button> : null
                    }
                    {crimeChosen ?
                        <button className="px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'>Crime X</p>
                        </button> : null
                    }
                    {romanChosen ?
                        <button className="px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'>Roman X</p>
                        </button> : null
                    }

                </div>
            </div>

            <div className="grid grid-cols-3">
                {books.map((book) => (
                    <div key={book.id} className="grid place-items-center border-4 ml-100">
                        <h1 className="text-xl">Title: {book.title}</h1>
                        <img src={book.imgURL} width="200" height="300" className='cursor-pointer' onClick={() => navigate(`/bookPage/${book.id}`)} />
                        <button type="button" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
                            Legg til i favoritter
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filter;