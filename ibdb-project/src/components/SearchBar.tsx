import { DocumentData } from 'firebase/firestore';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import firebaseControl from '../firebaseControl';


const SearchBar = () => {

  const firebaseController = new firebaseControl();
  const [books, setBooks] = useState<DocumentData[]>([]);

  useEffect(() => {
    let allBooks: DocumentData[] = [];
    const booksCached = localStorage.getItem("books");
    if (booksCached) {
      allBooks = JSON.parse(booksCached);
    } else {
      firebaseController.getBooks().then((orgBooks) => {
        allBooks = orgBooks;
      });
      localStorage.setItem('books', JSON.stringify(allBooks))
    }
    setBooks(allBooks);
  }, []);



let titleId = new Map<string, string>();

for (const book of books) {
  titleId.set(book.id, book.title);
}


const [value, setValue] = useState<string>('');
const [result, setResult] = useState<string[]>([]);

  useEffect(() => {
    if (value.length > 0) {
      let searchQuery = value.toLowerCase();
      setResult([]);
      for (let index = 1; index <= titleId.size; index++) {
        const search = titleId.get(index.toString())?.toLowerCase()
        const title= titleId.get(index.toString())
        if (title) {
          if (search?.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
          setResult(prevResult => {
            return [...prevResult, title]
          })
        }
      }
    }        
    } else {
      setResult([]);
    }
  }, [value])

  
  function getKeyByValue(value: string, map: Map<string, string>): string | undefined {
    for (const [key, mapValue] of map.entries()) {
      if (mapValue === value) {
        return key;
      }
    }
    return undefined;
  }
  
  const navigate = useNavigate();

  return (
    <div className = " block w-3/6">
      <input
        type="text"
        className="block w-full px-4 py-2 text-purple-700 bg-white rounded-full focus:border-teitTheme focus:ring-teitTheme focus:outline-none focus:ring focus:ring-opacity-40 shadow-0"
        placeholder="Search..." 
      onChange={(event)=> setValue(event.target.value)} 
      value ={value}/>
      <div>
      {result.map((result, index) => {  
        console.log("Searching for:", result);
      const bookId = getKeyByValue(result, titleId);
       console.log("Book ID:", bookId);

  //Navigerer til riktig bokside
  return (
    <a key={index} onClick={() => navigate(`/bookPage/${bookId}`)}>
      <div className='border-2 cursor-pointer hover:opacity-20 content-center'> 
        <p className=' font-serif font-bold'>                                   
        {result}
        </p>
      </div>
    </a>
  );
})}
      </div>
    </div>
  );
};

export default SearchBar;