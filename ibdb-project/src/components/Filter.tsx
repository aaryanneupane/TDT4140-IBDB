import React, { useEffect, useState } from 'react';
import 'firebase/firestore';
import firebaseControl from '../firebaseControl';
import { Link, useNavigate } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore';
import Card from './Card';
import '../styles/Filter.css';


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

    //cache og listener
    useEffect(() => {
        let allBooks: DocumentData[] = [];
        const booksCached = localStorage.getItem("books");
        if (booksCached) {
          allBooks = JSON.parse(booksCached);
        } else {
          firebaseController.getBooks().then((orgBooks) => {
            allBooks = orgBooks;
          });
          localStorage.setItem('books', JSON.stringify(allBooks))
        }
        setOrgBooks(allBooks);
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

    return (
        <div>
            <div className="navbar navbar-expand-lg shadow-md pb-5 px-10 bg-bigBoy relative flex items-center w-full justify-center space-x-10">
                <p>Filters: </p>
                <div className="space-y-2 relative bg-current">
                    <button onClick={() => setGenreClicked(!genreClicked)} className="px-5 py-2 rounded-lg bg-hvit shadow">
                        Genres
                    </button>
                    {genreClicked ?
                        <div className='navbar navbar-expand-lg absolute space-y-3 bg-current'>
                            {allGenres.map(genre => (
                                <button onClick={() => {setGenreChosen(genre); setGenreClicked(!genreClicked)}}>
                                    <Link to="/filteredBooks" className="px-5 py-2 rounded-lg bg-hvit shadow" >{genre}</Link>
                                </button>
                            ))}
                        </div>
                        : null}
                </div>

                <div className="space-y-2 relative bg-current">
                    <button onClick={() => setClickedYear(!clickedYear)} className="px-5 py-2 rounded-lg bg-hvit shadow">
                        Release Year
                    </button>
                    {clickedYear ?
                        <div className='navbar navbar-expand-lg absolute space-y-3 bg-current'>
                            <input id="fromValue" type="number" placeholder="From" className="px-3 py-2 rounded-lg bg-hvit shadow" />
                            <input id="toValue" type="number" placeholder="To" className="px-3 py-2 rounded-lg bg-hvit shadow" />
                            <button onClick={handleConfirm}>
                                <Link to="/filteredBooks" className="px-5 py-2 rounded-lg bg-hvit shadow" >Confirm</Link>
                            </button>
                        </div>

                        : null}
                </div>
                <div className="space-y-2 relative bg-current">

                    <button onClick={() => setSortClicked(!sortClicked)} className="px-5 py-2 rounded-lg bg-hvit shadow">
                        Sort By
                    </button>
                    {sortClicked ?
                        <div className='navbar navbar-expand-lg absolute space-y-3 bg-current'>
                            <button onClick={() => {setSortOn("rating"); setSortClicked(!sortClicked)}} className="rated-container">
                                <Link to="/filteredBooks" className="px-6 py-2 rounded-lg bg-hvit shadow" >Highest Rated</Link>
                            </button>
                            <button onClick={() => {setSortOn("newest"); setSortClicked(!sortClicked)}}>
                                <Link to="/filteredBooks" className="px-5 py-2 rounded-lg bg-hvit shadow" >Newest</Link>
                            </button>
                        </div>
                        : null}
                </div>
                <div>
                    {genreChosen != "" ?
                        <button onClick={() => { handleReset(); setGenreChosen("") }} className="border-2 px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'>{genreChosen} X</p>
                        </button> : null
                    }
                    {yearsChosen ?
                        <button onClick={() => { handleReset(); setYearsChosen(false) }} className="border-2 px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'> {fromValue} - {toValue} X</p>
                        </button> : null
                    }
                    {sortOn == "newest" ?
                        <button onClick={() => { handleReset(); setSortOn("") }} className="border-2 px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'> Newest X</p>
                        </button> : null
                    }
                    {sortOn == "rating" ?
                        <button onClick={() => { handleReset(); setSortOn("") }} className="border-2 px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'> Highest Rated X</p>
                        </button> : null
                    }
                </div>
            </div>
            <div className="ml-10 mt-10 grid grid-cols-5">
            {books.map((book) => (
          <Card
            title={book.title}
            bookIMG={book.imgURL}
            id={book.id}
            key={book.id}
          />
        ))}
            </div>
        </div>
    )
}

export default Filter;