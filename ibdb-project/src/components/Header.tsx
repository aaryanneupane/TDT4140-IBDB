import React from 'react'
import { Link } from 'react-router-dom';
import DownDrop from './DownDrop';
import './Header.css'

const Header = () => {
    let dDelements = [{id: 1, name: "1 item", link: "https://instabart.no/"}, {id: 2, name: "2 item", link: "https://instabart.no/"}]
    return (
        <div className="navbar navbar-expand-lg shadow-md py-5 px-10 relative flex items-center w-full justify-between">
            <button>
                <Link to="/" className="px-5 py-2 rounded-lg bg-kulTheme dark:hover:bg-teitThene font-serif text-3xl shadow-0 hover:shadow-lg" >IBDb</Link>
            </button>
            {/* <DownDrop elements={dDelements}/> */}
            <DownDrop/>
            <input
                type="text"
                className="block w-2/3 px-4 py-2 text-purple-700 bg-white rounded-full focus:ring-bigBoy focus:outline-none focus:ring focus:ring-opacity-40 shadow-inner"
                placeholder="Search..."/>
            <button>
                <Link to=" " className="px-5 py-2 rounded-lg bg-hvit shadow-0 hover:shadow-lg" >Filter</Link>
            </button>
            <button>
                <Link to="loginPage" className="px-5 py-2 rounded-lg bg-hvit shadow-0 hover:shadow-lg" >profil</Link>
            </button>

        </div>
    )
}

export default Header;