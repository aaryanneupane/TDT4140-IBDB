import React, { useEffect, useState } from 'react';
import 'firebase/firestore';
import { Link } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore';
import Card from './Card';
import '../styles/Filter.css';
import { MenuProps } from 'antd';
import DownDrop from './DownDrop';


const Filter = () => {

    const [books, setBooks] = useState<DocumentData[]>([]);
    const [orgBooks, setOrgBooks] = useState<DocumentData[]>([]);
    const [genreChosen, setGenreChosen] = useState("");
    const [sortOn, setSortBy] = useState("");
    const [yearsChosen, setYearsChosen] = useState(false);
    const [fromValue, setFromValue] = useState<number>(0);
    const [toValue, setToValue] = useState<number>(2023);


    let allGenres: string[] = ['Crime', 'Fantasy', 'Roman', 'Cartoon', 'Classic', 'Historical', 'Biography'];

    //cache og listener
    useEffect(() => {
        let allBooks: DocumentData[] = [];
        const booksCached = localStorage.getItem("books");
        if (booksCached) {
            allBooks = JSON.parse(booksCached);
        }
        setOrgBooks(allBooks);
    }, []);


    useEffect(() => {
        let filteredBooks = orgBooks.filter(book =>
            (genreChosen === "" || book.genre === genreChosen) &&
            (!yearsChosen || (book.releaseYear >= fromValue && book.releaseYear <= toValue))
        );

        if (sortOn === "newest") {
            filteredBooks = filteredBooks
                .filter(book => book.releaseYear <= 2023)
                .sort((b1, b2) => b2.releaseYear - b1.releaseYear);
        } else if (sortOn === "rating") {
            filteredBooks.sort((b1, b2) => b2.rating - b1.rating);
        }
        setBooks(filteredBooks);
    }, [yearsChosen, fromValue, toValue, sortOn, genreChosen]);

    const handleConfirm = () => {
        const fromElement = document.getElementById("fromValue") as HTMLInputElement;
        setFromValue(fromElement.value !== "" ? fromElement.valueAsNumber : 0);
        const toElement = document.getElementById("toValue") as HTMLInputElement;
        setToValue(toElement.value !== "" ? toElement.valueAsNumber : 2023);
        setYearsChosen(true);
    };

    const handleReset = () => {
        setBooks(orgBooks);
    }

    const genres: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <button onClick={() => setGenreChosen("Crime")}>
                    Crime
                </button>
            ),
        },
        {
            key: '2',
            label: (
                <button onClick={() => setGenreChosen("Fantasy")}>
                    Fantasy
                </button>
            ),
        },
        {
            key: '3',
            label: (
                <button onClick={() => setGenreChosen("Roman")}>
                    Roman
                </button>
            ),
        },
        {
            key: '4',
            label: (
                <button onClick={() => setGenreChosen("Cartoon")}>
                    Cartoon
                </button>
            ),
        },
        {
            key: '5',
            label: (
                <button onClick={() => setGenreChosen("Classic")}>
                    Classic
                </button>
            ),
        },
        {
            key: '6',
            label: (
                <button onClick={() => setGenreChosen("Historical")}>
                    Historical
                </button>
            ),
        },
        {
            key: '7',
            label: (
                <button onClick={() => setGenreChosen("Biography")}>
                    Biography
                </button>
            ),
        },
    ];
    const sortBy: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <button onClick={() => setSortBy("rating")}>
                    Highest Rated
                </button>
            ),
        },
        {
            key: '2',
            label: (
                <button onClick={() => setSortBy("newest")}>
                    Recently Released
                </button>
            ),
        },
    ];

    return (
        <div>
            <div className="navbar navbar-expand-lg shadow-md pb-5 px-10 bg-bigBoy relative flex items-center w-full justify-center space-x-10">
                <p>Filters: </p>
                <DownDrop items={genres} text="Genres" />
                <div className="space-y-2 relative bg-current">
                    <div className='release-year'>
                        <button className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg">
                            Release Year
                        </button>
                        <div className="years">
                            <div className='navbar navbar-expand-lg absolute bg-current'>
                                <input id="fromValue" type="number" placeholder="From" className="px-6 py-4 rounded-tr-lg bg-hvit shadow-0 hover:shadow-lg" />
                                <input id="toValue" type="number" placeholder="To" className="px-6 py-3 rounded-br-lg bg-hvit shadow-0 hover:shadow-lg" />
                                <button onClick={handleConfirm}>
                                    <Link to="/filteredBooks" className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg" >Confirm</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <DownDrop items={sortBy} text="Sort By" />
                <div>
                    {genreChosen !== "" ?
                        <button onClick={() => { handleReset(); setGenreChosen("") }} className="border-2 mx-2 px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'>{genreChosen} X</p>
                        </button> : null
                    }
                    {yearsChosen ?
                        <button onClick={() => { handleReset(); setYearsChosen(false) }} className="border-2 mx-2 px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'> {fromValue} - {toValue} X</p>
                        </button> : null
                    }
                    {sortOn === "newest" ?
                        <button onClick={() => { handleReset(); setSortBy("") }} className="border-2 mx-2 px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'> Recently Released X</p>
                        </button> : null
                    }
                    {sortOn === "rating" ?
                        <button onClick={() => { handleReset(); setSortBy("") }} className="border-2 mx-2 px-2 py-1 rounded-lg bg-slate-400 shadow">
                            <p className='text-sm'> Highest Rated X</p>
                        </button> : null
                    }
                </div>
            </div>
            {books.length > 0 ?
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
                :
                <div className="ml-10 mt-10 grid grid-cols-5">
                    {orgBooks.map((book) => (
                        <Card
                            title={book.title}
                            bookIMG={book.imgURL}
                            id={book.id}
                            key={book.id}
                        />
                    ))}
                </div>
            }

        </div>
    )
}

export default Filter;