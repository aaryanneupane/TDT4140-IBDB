import React from 'react'
import ScrollingMenuCustom from '../components/ScrollingMenuCustom';


const MyBookLists = () => {

    var userEmail = localStorage.getItem('user')?.replace(/"/g, '');
    if (userEmail === undefined){
        userEmail = "";
    }

    return (
        <div>
            <div className="custom-list">
                <ScrollingMenuCustom user={userEmail} list="1"/>
            </div>
            <div className="custom-list">
                <ScrollingMenuCustom user={userEmail} list="2"/>
            </div>
            <div className="custom-list">
                <ScrollingMenuCustom user={userEmail} list="3"/>
            </div>
            <div className="custom-list">
                <ScrollingMenuCustom user={userEmail} list="4"/>
            </div>
            <div className="custom-list">
                <ScrollingMenuCustom user={userEmail} list="5"/>
            </div>
        </div>
    )
}

export default MyBookLists;