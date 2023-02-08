import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <div className="header">
            <div></div>
            <div>
                <input className="searchBar" type="text" placeholder="Search"/>
            </div>
            <div className="rightSection">
                <button>
                    <Link to="addBook" className="buttonStyle">Add Book</Link>
                </button>
                <button>
                    <Link to="myBookLists" className="buttonStyle">My Lists</Link>
                </button>
                <button>
                    <Link to="ratedBooks" className="buttonStyle">Rated Books</Link>
                </button>
                <button>
                    <Link to="loginPage" className="buttonStyle">Login</Link>
                </button>
            </div>
        </div>
    )
}

export default Header;