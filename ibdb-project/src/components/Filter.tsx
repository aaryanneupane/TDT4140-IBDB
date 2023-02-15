import React, { useEffect, useState } from 'react';
import 'firebase/firestore';
import firebaseControl from '../firebaseControl';
import { Link, useNavigate } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore';


const Filter = () => {

    const firebaseController = new firebaseControl();
    const [books, setBooks] = useState<DocumentData[]>([]);
    const [bookList, setBookList] = useState<DocumentData[]>([]);


    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const allBooks = await firebaseController.getBooks();
            setBookList(allBooks);
        }
        fetchData();
    }, []);

    const [genreClicked, setGenreClicked] = useState(false);
    const [fictionChosen, setFictionChosen] = useState(false);
    const [romanChosen, setRomanChosen] = useState(false);
    const [crimeChosen, setCrimeChosen] = useState(false);

    const handleGenre = () => {
        setGenreClicked(!genreClicked);
    };

    const handleFictionChosen = () => {
        setFictionChosen(!fictionChosen);
        setBooks(bookList.filter(book => book.genre === "Fiction"));
    };

    const handleRomanChosen = () => {
        setRomanChosen(!romanChosen);
        setBooks(bookList.filter(book => book.genre === "Roman"));
    };

    const handleCrimeChosen = () => {
        setCrimeChosen(!crimeChosen);
        setBooks(bookList.filter(book => book.genre === "Crime"));
    };

    const [clickedYear, setClickedYear] = useState(false);
    const [yearsChosen, setYearsChosen] = useState(false);
    const [fromValue, setFromValue] = useState<number>(0);
    const [toValue, setToValue] = useState<number>(2023);

    const handleYear = () => {
        setClickedYear(!clickedYear);
    };

    const handleConfirm = () => {
        setClickedYear(!clickedYear);
        const fromElement = document.getElementById("fromValue") as HTMLInputElement;
        setFromValue(fromElement.value !== "" ? fromElement.valueAsNumber : 0);
        const toElement = document.getElementById("toValue") as HTMLInputElement;
        setToValue(toElement.value !== "" ? toElement.valueAsNumber : 2023);
        setYearsChosen(true);
        setBooks(bookList.filter(book => book.releaseYear >= fromValue && book.releaseYear <= toValue));
    };

    const [sort, setSort] = useState(false);

    const handleSort = () => {
        setSort(!sort);
    };

    const handleNewest = () => {
        setBooks(bookList.sort((book1, book2) => book2.releaseYear - book1.releaseYear));
    }

    const handleRated = () => {
        setBooks(bookList.sort((book1, book2) => book2.rating - book1.rating));
    }

    const handleReset = () => {
        setBooks(bookList);
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
                            <input id="fromValue" type="number" placeholder="Fra" className="px-3 py-2 rounded-lg bg-hvit shadow" />

                            <input id="toValue" type="number" placeholder="Til" className="px-3 py-2 rounded-lg bg-hvit shadow" />

                        </div>
                        : null}
                    <button onClick={handleConfirm}>
                        <Link to="/filteredBooks" className="px-5 py-2 rounded-lg bg-hvit shadow" >Bekreft</Link>
                    </button>
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
                    {yearsChosen ?
                        <button onClick={() => {handleReset(); setYearsChosen(false)}} className="px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'> {fromValue} - {toValue} X</p>
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