import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DownDrop from './DownDrop';
import '../styles/Header.css';
import SearchBar from './SearchBar';
import LoginPopup from './LoginPopup';
import { MenuProps } from 'antd';
import ScrollIntoView from 'react-scroll-into-view';
import { auth } from '../firebaseControl';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";


const Header = () => {

  const [filterClicked, setFilterClicked] = useState(false);
  const [popUpType, setPopUpType] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [visibleAddBook, setVisibleAddBook] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [divClass, setDivClass] = useState("sticky top-0 z-30 navbar navbar-expand-lg shadow-md py-5 px-10 relative bg-bigBoy");
  const navigate = useNavigate();

  let admins: string[] = ['admin@gmail.com'];

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
        if (user.email != null && admins.includes(user.email)) {
          setVisibleAddBook(true);
        } else {
          setVisibleAddBook(false);
        }
      } else {
        setUser(null);
        setVisibleAddBook(false);
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

  const lists: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <ScrollIntoView selector="#recentlyReleased">
          <button>
            Recently Released
          </button>
        </ScrollIntoView>
      ),
    },
    {
      key: '2',
      label: (
        <ScrollIntoView selector="#comingSoon">
          <button>
            Coming Soon
          </button>
        </ScrollIntoView>
      ),
    },
    {
      key: '3',
      label: (
        <ScrollIntoView selector="#topBooks">
          <button>
            Top Books
          </button>
        </ScrollIntoView>
      ),
    },
    {
      key: '4',
      label: (
        <ScrollIntoView selector="#RATI">
          <button>
            Recently added to IBDb
          </button>
        </ScrollIntoView>
      ),
    },
    {
      key: '5',
      label: (
        <ScrollIntoView selector="#RATI">
          <button>
            My Rated Books
          </button>
        </ScrollIntoView>
      ),
    },
    {
      key: '6',
      label: (
        <ScrollIntoView selector="">
          <button>
            My Custom List 1
          </button>
        </ScrollIntoView>
      ),
    },
  ];

  const profile: MenuProps['items'] = [
    {
      key: '1',
      label: <button className='w-full'>Darkmode</button>,
    },
    {
      key: '2',
      label: user ?
      <div>
        <button className="w-full" onClick={() => signOut(auth)}>
          Sign Out
        </button >
        <p className='user-email'>
          {user.email}
        </p>
      </div>
        : <button className="w-full" onClick= {() => {setPopupVisible(true); setPopUpType('login')}}>
          Log In
        </button>,
    },
    {
      key: '3',
      label:
        <button className="w-full" onClick= {() => {setPopupVisible(true); setPopUpType('signup')}}>
          Sign Up
        </button>
    },
  ];

  return (
    < div className={divClass} >
      <div className="flex items-center w-full justify-between">
        <button onClick={handleHideFilter}>
          <Link to="/" className="px-5 py-2 rounded-lg bg-kulTheme dark:hover:bg-teitThene font-serif text-4xl shadow-0 hover:shadow-lg " >IBDb</Link>
        </button>
        <DownDrop items={lists} text='Menu' />
        <SearchBar />
        <button>
          {filterClicked ?
            <Link to="/" onClick={handleHideFilter} className="px-6 py-3 rounded-xl bg-hvit shadow-0 hover:shadow-lg" >Hide Filter</Link>
            : <Link to="/filteredBooks" onClick={handleShowFilter} className="px-6 py-3 rounded-xl bg-hvit shadow-0 hover:shadow-lg" >Show Filter</Link>
          }
        </button>
        {visibleAddBook ?
          <button className="px-6 py-3 rounded-xl bg-hvit shadow-0 hover:shadow-lg" onClick={() => { navigate(`/addBook`); setFilterClicked(false) }}> Add Book</button>
          : null}
        <div>
          <DownDrop items={profile} text='Profile' />
        </div>
        <LoginPopup visible={popupVisible} setVisible={setPopupVisible} loginOrSignup={popUpType}/>
      </div>
    </div>)
}

export default Header;

