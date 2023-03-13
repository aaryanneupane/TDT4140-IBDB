import { useEffect, useState } from "react";
import  { User }  from 'firebase/auth';
import {auth} from "../firebaseControl";
import firebaseControl from "../firebaseControl";



const RatedBooks = () => {

    const userEmail = auth.currentUser?.email;

    return (
        <div>
            <h1>
                This is RatedBooks {userEmail}
            </h1>
        </div>
    )
}

export default RatedBooks;