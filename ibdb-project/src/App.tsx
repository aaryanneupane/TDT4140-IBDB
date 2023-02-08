import React, {useState} from 'react';
import firebase from "./firebase";
import 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';


function App() {

  const [books, setBooks] = useState<DocumentData>([]);
  const [singleBook, setSingleBook] = useState([]);

  const db = firebase.firestore();

  function getBooks(e) {
    e.preventDefault();
    db.collection("Books")
    .get()
    .then((snapshot) => {
      if(snapshot.docs.length>0) {
        snapshot.docs.forEach((doc) => {
          setBooks((prev) => {
            return[...prev, doc.data()]
          })
        })
      }
    })
    console.log(books)
  }

  function getSingleBook(e) {
    e.preventDefault();
    db.collection("books")
    .doc("bok1")
    .get().
    then((snapshot) => {
      if(snapshot) {
        setSingleBook(snapshot.data());
      }
    });
    console.log(singleBook)
  }
  return (
    <div>
      <div>
        <h1>Books</h1>
      </div>
      <div>
        <button onClick={getBooks}> getBooks </button>
        <button onClick={getSingleBook}> getBok1 </button>
        <h1>{singleBook.Author}</h1>
        <h1>{singleBook.Title}</h1>
      </div>
    </div>
  );
}

export default App;
