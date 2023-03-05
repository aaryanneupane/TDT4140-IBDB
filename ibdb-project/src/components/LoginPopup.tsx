import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import '../styles/LoginPopup.css';
import { AuthError, AuthErrorCodes, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseControl';

const LoginPopup = ({ visible, setVisible, loginOrSignup }: { visible: boolean; setVisible: Dispatch<SetStateAction<boolean>>; loginOrSignup: string }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const close = () => {
        setVisible(false);
        setEmail('');
        setPassword('');
        setErrorMessage('');
    }

    const closeOrOpen: MouseEventHandler<HTMLDivElement> = (e) => {
        const isClose = (e.target as HTMLElement).closest("#popup")
        if (!isClose) {
            close();
        }
    }

    // Logs in the mail and password set
    const logIn = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log(userCredentials);
                close();
            }).catch((error) => {
                console.log(error);
                showError(error);
            });
    }
    // Opens popup to sign in with google
    const googleLogIn = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        signInWithPopup(auth, googleProvider)
            .then((userCredentials) => {
                console.log(userCredentials);
                close();
            });
    }

    // Sets error message corresponding to the error
    const showError = (error: AuthError) => {
        if (error.code === 'auth/invalid-email') {
            setErrorMessage('Invalid Email')
        } else if (error.code === 'auth/user-not-found') {
            setErrorMessage('No user with this email');
        } else if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
            setErrorMessage('Wrong password, try again');
        } else if (error.code === 'auth/too-many-requests') {
            setErrorMessage('Access to this account has been temporarily disabled due to many failed login attempts');
        } else if (error.code === 'auth/weak-password') {
            setErrorMessage('Password should be at least 6 characters');
        } else {
            setErrorMessage('Error, try again later');
        }
    }

    // Creates new user and checks for error
    const signUp = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log(userCredentials);
                close();
            }).catch((error) => {
                console.log(error);
                showError(error);
            });
    }
    return (
        <div>
            {visible ?
                <div className="login" onClick={closeOrOpen}>
                    <div className="login-inner" id="popup">
                        <input className="input shadow-0" id="email" type="text" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <input className="input shadow-0" id="password" type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        {errorMessage !== '' ?
                            <p className='error'>{errorMessage}</p>
                            : null}
                        <div className='login-close'>
                            {loginOrSignup === 'login' ?
                                <button className="popup-button shadow-0" onClick={logIn}>
                                    Log in
                                </button> : <button className="popup-button shadow-0" onClick={signUp}>
                                    Sign up
                                </button>
                            }

                            <button className="close shadow-0" onClick={() => close()}>
                                X
                            </button>
                        </div>
                            <button className="google-button shadow-0" onClick={googleLogIn}>
                                Sign in with Google
                                <img className="google-icon" src="https://freesvg.org/img/1534129544.png" />
                            </button>

                    </div>
                </div> : null}
        </div>
    )

}

export default LoginPopup;