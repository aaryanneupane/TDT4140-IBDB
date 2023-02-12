import React, {useEffect, useLayoutEffect, useState} from 'react';


const Dropdown = () => {
    const [open, setOpen] = React.useState(false);


    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className='dropdown'>
            <button onClick={handleOpen} className= "px-5 py-2 rounded-lg bg-hvit shadow">
                Meny
                </button>
            {open ? (
                <ul className='Meny'>
                    <li>
                        <button>Nyheter</button>
                    </li>
                    <li>
                        <button>Kommer</button>
                    </li>
                    <li>
                        <button>Topplister</button>
                    </li>
                    <li>
                        <button>Favoritter</button>
                    </li>
                    <li>
                        <button>Tilpasset liste</button>
                    </li>
                    <li>
                        <button>Lag tilpasset liste</button>
                    </li>
                </ul>
            ): null}
            {open ? <div>Is Open</div> : <div>Is Closed </div>}
        </div>
    );
    };



/*
const Dropdown =() => {
    return
    <div>
        <div className = "px-5 py-2 rounded-lg bg-hvit shadow">
            Meny
        </div>
        <ul>
            <li className="p-2 text-sm hover:shadow">sample</li>
            <li className="p-2 text-sm hover:shadow">sample</li>
            <li className="p-2 text-sm hover:shadow"></li>
            <li className="p-2 text-sm hover:shadow"></li>
        </ul>
    </div>


}
*/
export default Dropdown;