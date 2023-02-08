import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAVZS1MZ7twZLXAGzOH2a4fUdk5PTixsoM",
    authDomain: "ibdb-743f5.firebaseapp.com",
    projectId: "ibdb-743f5",
    storageBucket: "ibdb-743f5.appspot.com",
    messagingSenderId: "870088009869",
    appId: "1:870088009869:web:f33ac12df7b1bb6a415ac4",
    measurementId: "G-G39Y25NM7D"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;