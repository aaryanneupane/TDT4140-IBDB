import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DownDrop from './DownDrop';
import '../styles/Header.css';
import SearchBar from './SearchBar';

const Header = () => {

    // const [filterClicked, setFilterClicked] = useState(false);


    let dDelements = [{ id: 1, name: "1 item", link: "https://instabart.no/" }, { id: 2, name: "2 item", link: "https://instabart.no/" }]

    return (
        <div className="sticky top-0 z-30 navbar navbar-expand-lg shadow-md py-5 px-10 relative bg-bigBoy">
            <div className ="flex items-center w-full justify-between">
                <button>
                    <Link to="/" className="px-5 py-2 rounded-lg bg-kulTheme dark:hover:bg-teitThene font-serif text-4xl shadow-0 hover:shadow-lg " >IBDb</Link>
                </button>
                {/* <DownDrop elements={dDelements}/> */}
                <DownDrop />
            <SearchBar/>
                {/* <input
                    type="text"
                    className="block w-2/3 px-4 py-4 text-purple-700 bg-white rounded-full focus:ring-bigBoy focus:outline-none focus:ring focus:ring-opacity-40 shadow-inner"
                    placeholder="Search..." /> */}
                {/* <button onClick={() => setFilterClicked(!filterClicked)}> */}
                <button>
                    <Link to="" className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg" >Filter</Link>
                </button>
                
                <button>
                    <Link to=" " className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg" >Profile</Link>
                </button>
            </div>
            {/* <div>
                { filterClicked ?
                    <Filter/>
                    : null
                }
            </div> */}
        </div>)
}

export default Header;

