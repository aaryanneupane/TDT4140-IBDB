import React from 'react'
import ScrollingMenu from '../components/ScrollingMenu';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div>
            <div className="conteiner">
                <div className="header">
                    <div className="element"></div>
                    <h1>Recently Released</h1>
                </div>
                <ScrollingMenu filter="news"/>
            </div>
            <div className="conteiner">
                <div className="header">
                    <div className="element"></div>
                    <h1>Coming Soon</h1>
                </div>
                <ScrollingMenu filter="coming"/>
            </div>
            <div className="conteiner">
                <div className="header">
                    <div className="element"></div>
                    <h1>Top Books</h1>
                </div>
                <ScrollingMenu filter="rated"/>
            </div>
            <div className="conteiner">
                <div className="header">
                    <div className="element"></div>
                    <h1>Recently added to IBDb</h1>
                </div>
                <ScrollingMenu filter="added"/>
            </div>
        </div>
    )
}

export default HomePage;