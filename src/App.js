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

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/:name" element={<Collection />} />
          <Route path="/news" element={<News />} />
          <Route path="/help" element={<Help />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/:name/:id" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/public" element={<Offer />} />
          <Route path="/search" element={<Search />} />
          {/* <Route path="*" element={<div> Ошибка в запросе!</div> } /> */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
