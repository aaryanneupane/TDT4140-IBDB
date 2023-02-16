import React, { useEffect, useState } from 'react';
import 'firebase/firestore';
import firebaseControl from '../firebaseControl';
import { Link, useNavigate } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore';


const Filter = () => {

    const firebaseController = new firebaseControl();
    const [books, setBooks] = useState<DocumentData[]>([]);
    const [orgBooks, setOrgBooks] = useState<DocumentData[]>([]);
    const [genreClicked, setGenreClicked] = useState(false);
    const [genreChosen, setGenreChosen] = useState("");
    const [sortOn, setSortOn] = useState("");
    const [sortClicked, setSortClicked] = useState(false);
    const [clickedYear, setClickedYear] = useState(false);
    const [yearsChosen, setYearsChosen] = useState(false);
    const [fromValue, setFromValue] = useState<number>(0);
    const [toValue, setToValue] = useState<number>(2023);


    const navigate = useNavigate();

    let allGenres: string[] = ['Crime', 'Fiction', 'Roman', 'Classic', 'Folklore', 'Historical', 'Biography'];

    useEffect(() => {
        firebaseController.getBooks().then(orgBooks => setOrgBooks(orgBooks))
    }, []);


    useEffect(() => {
        let filteredBooks = orgBooks.filter(book =>
            (genreChosen === "" || book.genre === genreChosen) &&
            (!yearsChosen || (book.releaseYear >= fromValue && book.releaseYear <= toValue))
        );

        if (sortOn === "newest") {
            filteredBooks.sort(
                (b1, b2) => b2.releaseYear - b1.releaseYear
            );
        } else if (sortOn === "rating") {
            filteredBooks.sort((b1, b2) => b2.rating - b1.rating);
        }
        setBooks(filteredBooks);
    }, [yearsChosen, fromValue, toValue, sortOn, genreChosen]);

    const handleGenre = () => {
        setGenreClicked(!genreClicked);
    };

    const handleConfirm = () => {
        setClickedYear(!clickedYear);
        const fromElement = document.getElementById("fromValue") as HTMLInputElement;
        setFromValue(fromElement.value !== "" ? fromElement.valueAsNumber : 0);
        const toElement = document.getElementById("toValue") as HTMLInputElement;
        setToValue(toElement.value !== "" ? toElement.valueAsNumber : 2023);
        setYearsChosen(true);
    };

    const handleReset = () => {
        setBooks(orgBooks);
    }

    const handleGenreChosen = (genre:string) => {
        setGenreChosen(genre);
    };


    return (
        <div>
            <div className="navbar navbar-expand-lg shadow-md pb-5 px-10 bg-bigBoy relative flex items-center w-full justify-center space-x-10">
                <p>Filtere: </p>
                <div className="space-y-2 relative bg-current">
                    <button onClick={handleGenre} className="px-5 py-2 rounded-lg bg-hvit shadow">
                        Sjanger
                    </button>
                    {genreClicked ?
                        <div className='navbar navbar-expand-lg absolute space-y-3 bg-current'>
                            {allGenres.map(genre => (
                                        <button onClick={() => (handleGenreChosen((genre)))}>
                                            <Link to="/filteredBooks" className="px-5 py-2 rounded-lg bg-hvit shadow" >{genre}</Link>
                                        </button>
                            ))}  
                        </div>
                    : null}
                </div>

                <div className="space-y-2 relative bg-current">
                    <button onClick={() => setClickedYear(!clickedYear)} className="px-5 py-2 rounded-lg bg-hvit shadow">
                        Utgivelsesår
                    </button>
                    {clickedYear ?
                        <div className='navbar navbar-expand-lg absolute space-y-3 bg-current'>
                            <input id="fromValue" type="number" placeholder="Fra" className="px-3 py-2 rounded-lg bg-hvit shadow" />
                            <input id="toValue" type="number" placeholder="Til" className="px-3 py-2 rounded-lg bg-hvit shadow" />
                            <button onClick={handleConfirm}>
                                <Link to="/filteredBooks" className="px-5 py-2 rounded-lg bg-hvit shadow" >Bekreft</Link>
                            </button>
                        </div>

                        : null}
                </div>
                <div className="space-y-2 relative bg-current">

                    <button onClick={() => setSortClicked(!sortClicked)} className="px-5 py-2 rounded-lg bg-hvit shadow">
                        Sorter etter
                    </button>
                    {sortClicked ?
                        <div className='navbar navbar-expand-lg absolute space-y-3 bg-current'>
                            <button onClick={() => setSortOn("rating")}>
                                <Link to="/filteredBooks" className="px-3 py-2 rounded-lg bg-hvit shadow" >Høyest Rated</Link>
                            </button>
                            <button onClick={() => setSortOn("newest")}>
                                <Link to="/filteredBooks" className="px-5 py-2 rounded-lg bg-hvit shadow" >Nyeste</Link>
                            </button>
                        </div>
                        : null}
                </div>
                <div>
                    {genreChosen != "" ?
                        <button onClick={() => { handleReset(); setGenreChosen("") }} className="px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'>{genreChosen} X</p> 
                        </button> : null
                    }
                    {yearsChosen ?
                        <button onClick={() => { handleReset(); setYearsChosen(false) }} className="px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'> {fromValue} - {toValue} X</p>
                        </button> : null
                    }
                    {sortOn == "newest" ?
                        <button onClick={() => { handleReset(); setSortOn("") }} className="px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'> Nyeste X</p>
                        </button> : null
                    }
                    {sortOn == "rating" ?
                        <button onClick={() => { handleReset(); setSortOn("") }} className="px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'> Høyeste Rated X</p>
                        </button> : null
                    }
                </div>
            </div>
        
            {genreChosen != "" || sortOn != "" || yearsChosen ?
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
            : 
            <div className="grid grid-cols-3">
                {orgBooks.map((book) => (
                    <div key={book.id} className="grid place-items-center border-4 ml-100">
                        <h1 className="text-xl">Title: {book.title}</h1>
                        <img src={book.imgURL} width="200" height="300" className='cursor-pointer' onClick={() => navigate(`/bookPage/${book.id}`)} />
                        <button type="button" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
                            Legg til i favoritter
                        </button>
                    </div>
                ))}
            </div>
        }
        </div>
    )
}

export default Filter;