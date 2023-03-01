import { DocumentData } from 'firebase/firestore';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {

  const [books, setBooks] = useState<DocumentData[]>([]);

  useEffect(() => {
    let allBooks: DocumentData[] = [];
    const booksCached = localStorage.getItem("books");
    if (booksCached) {
      allBooks = JSON.parse(booksCached);
    }
    setBooks(allBooks);
  }, []);



let titleId = new Map<string, string>();
let titleAuthor = new Map<string, string>();

for (const book of books) {
  titleId.set(book.id, book.title);
}

for (const book of books) {
  titleAuthor.set(book.title, book.author);
}


const [value, setValue] = useState<string>('');
const [result, setResult] = useState<string[]>([]);

function getKeyByValue(value: string, map: Map<string, string>): string | undefined {
  for (const [key, mapValue] of map.entries()) {
    if (mapValue === value) {
      return key;
    }
  }
  return undefined;
}

  useEffect(() => {
    if (value.length > 0) {
      let searchQuery = value.toLowerCase();
      setResult([]);
      for (let index = 1; index <= titleId.size; index++) {
        const book = titleId.get(index.toString());
        if (book){
          const titleLower = book?.toLowerCase();
          const authorLower = titleAuthor.get(book)?.toLowerCase();
          //const authorLower = getKeyByValue(book, titleAuthor)?.toLowerCase();

          //const search = titleId.get(index.toString())?.toLowerCase()
          //const title = titleId.get(index.toString())
          
          if (titleLower?.slice(0, searchQuery.length).indexOf(searchQuery) !== -1 || authorLower?.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
          setResult(prevResult => {
            return [...prevResult, book]
          })
        }
      }
    }        
    } else {
      setResult([]);
    }
  }, [value])

  
  
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
      const bookAuthor = titleAuthor.get(result);
       console.log("Book ID:", bookId);
       console.log("Book Author:", bookAuthor);
       

  //Navigerer til riktig bokside
  return (
    <a key={index} onClick={() => navigate(`/bookPage/${bookId}`)}>
      <div className='border-2 cursor-pointer hover:opacity-20 content-center'> 
        <p className=' font-serif font-bold'>                                   
        {result}
        <p>
        {bookAuthor}
        </p>
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