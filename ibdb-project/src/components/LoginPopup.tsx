import { Dispatch, SetStateAction } from 'react';
import '../styles/LoginPopup.css';


const LoginPopup = ({ visible, setVisible }: { visible: boolean; setVisible: Dispatch<SetStateAction<boolean>> }) => {

    console.log("Login", visible);

    return (
        <div>
            {visible ?
                <div className="login">
                    <div className="login-inner rounded-lg">
                        <input id="email" type="text" placeholder="Email" className="px-6 py-4 bg-hvit shadow-0 hover:shadow-lg" />
                        <input id="password" type="text" placeholder="Password" className="px-6 py-4 bg-hvit shadow-0 hover:shadow-lg" />
                        <button className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg login-close" onClick={(() => { setVisible(false); console.log("button clicked") })}>
                            Close
                        </button>
                    </div>
                </div> : null}
        </div>
    )

}

export default LoginPopup;