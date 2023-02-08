import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = () => {
    return (
        <div>
            <Header/>
            <Link to="loginPage">Login</Link>
            <Link to="addBook">Add Book</Link>
            <Link to="myBookLists">My Lists</Link>
            <Link to="ratedBooks">Rated Books</Link>

        </div>
    )
}

export default HomePage;