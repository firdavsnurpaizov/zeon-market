import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Collections from './components/Collections/Collections';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import News from './components/News/News';
import Main from './components/Main/Main';
import Help from './components/Help/Help';
import Favorites from './components/Favorites/Favorites';
import Collection from './components/Collection/Collection';
import Details from './components/Details/Details';
import Cart from './components/Cart/Cart';
import Offer from './components/Offer/Offer';
import 'antd/dist/antd.css';
import Search from './components/Search/Search';
import Registration from './components/Auth/Registration';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';

function App() {

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Home />} >


            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/collections/:name" element={<Collection />} />
            <Route path="/news" element={<News />} />
            <Route path="/help" element={<Help />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/collections/:name/:id" element={<Details />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/public" element={<Offer />} />
            <Route path="/search" element={<Search />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
