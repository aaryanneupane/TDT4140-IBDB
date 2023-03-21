import React, { useEffect } from 'react'
import { useState } from 'react';
import firebaseControl from '../firebaseControl';
import '../styles/HomePage.css';
import { useNavigate } from 'react-router-dom';
import '../styles/AddPage.css';

const AddAdPage = () => {

    // for ad: 
    const [advertiser, setAdvertiser] = useState<string>('');
    const [adimgURL, setAdImgURL] = useState<string>('');
    const [WPURL, setWPURL] = useState<string>('');
    const [adButtonActive, setAdButtonActive] = useState<boolean>(false);
    const [adId, setadId] = useState<string>('');
    const [row, setRows] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    //
    
    
    const firebaseController = new firebaseControl();
    const navigate = useNavigate();

    async function addThisAd() {
        if (advertiser.length > 0 && adimgURL.length > 0 && WPURL.length > 0){
            await firebaseController.addAd(advertiser, WPURL, adimgURL, adId);
            setAdvertiser('');
            setWPURL('');
            setAdImgURL('');
            setadId("")

        //Navigate back to homepage
        navigate(`/`);
            
        }
    }

    // For ads
    useEffect(() => {
        if (advertiser.length > 0 && adimgURL.length > 0 && WPURL.length > 0 && row != undefined){
            setAdButtonActive(true);
        } else {
            setAdButtonActive(false);
        }
    }, [advertiser, adimgURL, WPURL, row]);

     //Check if current user is admin
    useEffect(() => {
        const userEmail = localStorage.getItem('user')?.replace(/"/g, '');
        if (userEmail === "admin@gmail.com"){
             setIsAdmin(true);
         }
    }, [])

    const rows = [
        { id: "1", rows: "First row" },
        { id: "2", rows: "Second row" },
        { id: "3", rows: "Third row" },
        { id: "4", rows: "Bottom row" },

    ];


    function handleRowChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedRow = event.target.value; 
        setRows(selectedRow);
        const selectedRowObject = rows.find(row => row.rows === selectedRow);
        if (selectedRowObject) {
            setadId(selectedRowObject.id);
            }
    }
    
    return (
        <div>
        { isAdmin ? 
        <div className='w-full'>
   
         {/*Add advertisements*/}

         <div className="header mt-10">
                <div className="element "></div>
                    <h1>Add new advertisement</h1>
                </div>

            <div className="px-8 py-4 grid gap-6 md:grid-cols-2 w-2/3 items-start mt-8">
                <div>
                    {/* trinn for radvalg */}
                    <label className="block mb-2 text-sm font-semibold">Row in homepage</label>
                    <select id ='rows-select' name ='rows' value={row} onChange={handleRowChange} 
                        className=" input-field block w-full px-4 py-2 text-purple-700 bg-white rounded-full focus:border-teitTheme focus:ring-teitTheme focus:outline-none focus:ring focus:ring-opacity-40 shadow-0">
                        {rows.map(el => <option key={el.id} value={el.rows} >{el.rows}</option>)} 
                        <option value="" selected disabled hidden>Select row</option>
                    </select>
                </div>   
                <div>
                    <label className="block mb-2 text-sm font-semibold">Name of advertiser</label>
                    <input type="text" 
                        className="input-field block w-full px-4 py-2 text-purple-700 bg-white rounded-full focus:border-teitTheme focus:ring-teitTheme focus:outline-none focus:ring focus:ring-opacity-40 shadow-0"
                        placeholder="Name of advertiser" 
                        value={advertiser} onChange={(event) => {setAdvertiser(event.target.value)}}/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-semibold">Website URL</label>
                    <input type="text" 
                        className=" input-field block w-full px-4 py-2 text-purple-700 bg-white rounded-full focus:border-teitTheme focus:ring-teitTheme focus:outline-none focus:ring focus:ring-opacity-40 shadow-0"
                        placeholder="Website URL" 
                        value={WPURL} onChange={(event) => {setWPURL(event.target.value)}}/>
                </div>                    
                <div>
                    <label className="block mb-2 text-sm font-semibold">Image URL</label>
                    <input type="text" 
                        className=" input-field block w-full px-4 py-2 text-purple-700 bg-white rounded-full focus:border-teitTheme focus:ring-teitTheme focus:outline-none focus:ring focus:ring-opacity-40 shadow-0"
                        placeholder="Image URL" 
                        value={adimgURL} onChange={(event) => {setAdImgURL(event.target.value)}}/>
                </div> 

                <div>
                    {adButtonActive ? 
                        <div>
                            <label className=" block mb-2 text-sm font-semibold">Ready to add your ad!</label>
                            <button onClick={addThisAd} className="button-enable px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg">
                                Add advertisement
                            </button>
                        </div>
                        : 
                        <div>
                            <label className=" block mb-2 text-sm font-semibold">Fill out all fields to add your advertisement</label>
                            <button type="button" disabled className="input-field px-6 py-3 rounded-lg shadow-0 bg-hvit">
                            Add advertisement
                            </button>
                        </div>
                    }
                </div>
            </div>
                
        </div>
        : 
        <div>
        <p>Only admins can access this page</p>
        </div>
        }
        </div>    
    )
}

export default AddAdPage;