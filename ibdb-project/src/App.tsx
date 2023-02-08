import React, {useEffect, useLayoutEffect, useState} from 'react';

import 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';
import firebaseControl from './firebaseControl';
import { log } from 'console';
import { Book } from './type';

const firebaseController = new firebaseControl();


function App() {

  const [books, setBooks] = useState<Book[]>([])
  
useEffect(() => {
    firebaseController.getBooks().then(books => setBooks(books))

    return

}, [])

console.log(books);

return (
 
    <div>
      <div>
        <h1>Books</h1>
      </div>
      { books[0] &&
        <div>
          <h1>{books[0].author}</h1>
        </div>
      }
    </div>
  );
}

export default App;
