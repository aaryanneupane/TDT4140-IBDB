import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DownDrop from './DownDrop';
import '../styles/Header.css';
import SearchBar from './SearchBar';
import LoginPopup from './LoginPopup';
import { MenuProps } from 'antd';
import { auth } from '../firebaseControl';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';

const Header = () => {

  const [filterClicked, setFilterClicked] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [divClass, setDivClass] = useState("sticky top-0 z-30 navbar navbar-expand-lg shadow-md py-5 px-10 relative bg-bigBoy");

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);


  const handleHideFilter = () => {
    setFilterClicked(false);
    setDivClass("sticky top-0 z-30 navbar navbar-expand-lg shadow-md py-5 px-10 relative bg-bigBoy");
  }

  const handleShowFilter = () => {
    setFilterClicked(true);
    setDivClass("sticky top-0 z-30 navbar navbar-expand-lg py-5 px-10 relative bg-bigBoy");
  }


  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://instabart.no/">
          Recently Released
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://instabart.no/">
          Coming Soon
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://instabart.no/">
          Top Books
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://instabart.no/">
          Recently added to IBDb
        </a>
      ),
    },
    {
      key: '5',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://instabart.no/">
          My Rated Books
        </a>
      ),
    },
    {
      key: '6',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://instabart.no/">
          My Custom List 1
        </a>
      ),
    },
  ];

  return (
    < div className={divClass} >
      <div className="flex items-center w-full justify-between">
        <button onClick={handleHideFilter}>
          <Link to="/" className="px-5 py-2 rounded-lg bg-kulTheme dark:hover:bg-teitThene font-serif text-4xl shadow-0 hover:shadow-lg " >IBDb</Link>
        </button>
        <DownDrop items={items} text='Menu' />
        <SearchBar />
        <button>
          {filterClicked ?
            <Link to="/" onClick={handleHideFilter} className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg" >Hide Filter</Link>
            : <Link to="/filteredBooks" onClick={handleShowFilter} className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg" >Show Filter</Link>
          }
        </button>
        <div>
          {user ?
          <div>
            <button className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg" onClick={() => signOut(auth)}> Sign out</button>
            <p>Signed in with {user.email}</p>
            </div>
            : 
              <button className="px-6 py-3 rounded-lg bg-hvit shadow-0 hover:shadow-lg" onClick={() => setPopupVisible(true)}> Log In</button>
            }
        </div>
        <LoginPopup visible={popupVisible} setVisible={setPopupVisible} />
      </div>
    </div>)
}

export default Header;

