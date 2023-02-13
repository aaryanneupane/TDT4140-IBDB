import React from 'react'
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import './Header.css'

const Header = () => {
    return (
        <div className="navbar navbar-expand-lg shadow-md py-5 px-10 relative flex items-center w-full justify-between">
            <button>
                <Link to="/" className="px-5 py-2 rounded-lg bg-kulTheme dark:hover:bg-teitThene font-serif text-3xl shadow-0 hover:shadow-lg" >IBDb</Link>
            </button>
<<<<<<< HEAD


            <button className="px-5 py-2 rounded-lg bg-hvit shadow font-sans" onClick={Dropdown}><p>Meny</p>
=======
            <button>
                <Link to=" " className="px-5 py-2 rounded-lg bg-hvit shadow-0 hover:shadow-lg" >Meny</Link>
>>>>>>> 3120a77e78fac1f9c6c021ef456b50560fc2d593
            </button>


            <input
                type="text"
<<<<<<< HEAD
                className="block w-2/3 px-4 py-2 text-purple-700 bg-white rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 shadow font-sans"
                placeholder="Search..."/>
            <button>
                <Link to=" " className="px-5 py-2 rounded-lg bg-hvit shadow font-sans" >Filter</Link>
            </button>
            <button className ="flex">
                <img src="https://i.pinimg.com/originals/8b/aa/f5/8baaf5d76905923ce66b24205a1532dd.jpg" className = "ax-w-full h-auto rounded-full w-11 shadow object-right-bottom" alt="" />
                <Link to="loginPage" className="px-5 py-2 rounded-lg bg-hvit shadow font-sans" >Profil</Link>
=======
                className="block w-2/3 px-4 py-2 text-purple-700 bg-white rounded-full focus:ring-bigBoy focus:outline-none focus:ring focus:ring-opacity-40 shadow-inner"
                placeholder="Search..."/>
            <button>
                <Link to=" " className="px-5 py-2 rounded-lg bg-hvit shadow-0 hover:shadow-lg" >Filter</Link>
            </button>
            <button>
                <Link to="loginPage" className="px-5 py-2 rounded-lg bg-hvit shadow-0 hover:shadow-lg" >profil</Link>
>>>>>>> 3120a77e78fac1f9c6c021ef456b50560fc2d593
            </button>

        </div>
    )
}

export default Header;