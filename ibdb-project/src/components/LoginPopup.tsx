import { Dispatch, SetStateAction, useState } from 'react';
import '../styles/LoginPopup.css';
import { AuthError, AuthErrorCodes, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseControl';

const LoginPopup = ({ visible, setVisible }: { visible: boolean; setVisible: Dispatch<SetStateAction<boolean>> }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const reset = () => {
        setVisible(false);
        setEmail('');
        setPassword('');
        setErrorMessage('');
    }

    const logIn = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log(userCredentials);
                reset();
            }).catch((error) => {
                console.log(error);
                showError(error);
            });
    }

    const showError = (error: AuthError) => {
        if (error.message == 'Firebase: Error (auth/invalid-email).') {
            setErrorMessage('Invalid Email')
        } else if (error.message == 'Firebase: Error (auth/user-not-found).') {
            setErrorMessage('No user with this email');
        } else if (error.message == 'Firebase: Error (auth/wrong-password).') {
            setErrorMessage('Wrong password, try again');
        } else if (error.message == 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).') {
            setErrorMessage('Access to this account has been temporarily disabled due to many failed login attempts');
        }
    }

    const signUp = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log(userCredentials);
                reset();
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <div>
            {visible ?
                <div className="login">
                    <div className="login-inner rounded-lg">
                        <input className="px-6 py-4 bg-hvit shadow-0 hover:shadow-lg" id="email" type="text" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <input className="px-6 py-4 bg-hvit shadow-0 hover:shadow-lg" id="password" type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <button className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg login-close" onClick={() => { reset() }}>
                            Close
                        </button>
                        {errorMessage != '' ?
                            <p className='error'>{errorMessage}</p>
                            : null}
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