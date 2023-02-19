import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, DocumentData } from 'firebase/firestore/lite';

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

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);


class firebaseControl {

  constructor() {
  };

  async getBooks() {
    const books = collection(db, 'books');
    const bookSnapshot = await getDocs(books);
    const bookList = bookSnapshot.docs.map(doc => doc.data());
    return bookList;
  };

  getBookIds() {
    const colRef = collection(db, "books");
    let bookIDs: any[] = [];
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        bookIDs.push({ id: doc.id });
      })
    });
    return bookIDs;
  };

  async getBook(id: string) {
    const doc = await firebase.firestore().collection('books').doc(id).get();
    const docData = doc.data();
    return docData;
  }

  listenForBookChanges = (callback: (updatedBooks: DocumentData[]) => void): (() => void) => {
    const unsubscribe = firebase.firestore().collection("books")
      .onSnapshot((snapshot) => {
        const updatedBooks: DocumentData[] = [];
        snapshot.forEach((doc) => {
          updatedBooks.push(doc.data());
        });
        callback(updatedBooks);
      });
    return unsubscribe;
  };



};

export default firebaseControl