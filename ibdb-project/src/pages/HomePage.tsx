import React from 'react'
import Header from '../components/Header';
import Book from '../components/Book';
import Filter from '../components/Filter';

const HomePage = () => {
    return (
        <div>
            <Header/>
            <Filter/>
            <Book/>

        </div>
    )
}

export default HomePage;