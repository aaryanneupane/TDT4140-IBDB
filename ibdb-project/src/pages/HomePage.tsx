import React from 'react'
import Book from '../components/Book';
import ScrollingMenu from '../components/ScrollingMenu';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div>
            <div className="conteiner">
                <div className="header">
                    <div className="element"></div>
                    <h1>News</h1>
                </div>
                <ScrollingMenu/>
            </div>
            <div className="conteiner">
                <div className="header">
                    <div className="element"></div>
                    <h1>Comming Soon</h1>
                </div>
                <ScrollingMenu/>
            </div>
            <div className="conteiner">
                <div className="header">
                    <div className="element"></div>
                    <h1>Top Books</h1>
                </div>
                <ScrollingMenu/>
            </div>
            <div className="conteiner">
                <div className="header">
                    <div className="element"></div>
                    <h1>My Favorites</h1>
                </div>
                <ScrollingMenu/>
            </div>
        </div>
    )
}

export default HomePage;