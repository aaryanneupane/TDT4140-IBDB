import { Dispatch, SetStateAction, useState } from 'react';
import '../styles/LoginPopup.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseControl';

const LoginPopup = ({ visible, setVisible }: { visible: boolean; setVisible: Dispatch<SetStateAction<boolean>> }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logIn = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log(userCredentials);
            }).catch((error) => {
                console.log(error);
            });
        setVisible(false)
    }

    const signUp = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log(userCredentials);
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <div>
            {visible ?
                <div className="login">
                    <div className="login-inner rounded-lg">
                        <input className="px-6 py-4 bg-hvit shadow-0 hover:shadow-lg" id="email" type="text" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                        <input className="px-6 py-4 bg-hvit shadow-0 hover:shadow-lg" id="password" type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                        <button className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg login-close" onClick={() => { setVisible(false) }}>
                            Close
                        </button>
                        <button className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg" onClick={logIn}>
                            Log in
                        </button>
                        <button className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg" onClick={signUp}>
                            Sign Up
                        </button>
                    </div>
                </div> : null}
        </div>
    )

}

export default LoginPopup;