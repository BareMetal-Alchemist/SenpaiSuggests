import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/loginPage';
import MainMenu from './pages/mainMenu';
import Navbar from './Components/Navbar.jsx';
import Signup from './pages/Signup';
import Rec from './pages/reco';
import Test from './pages/testmenu';
import LikedAnimesPage from './pages/LikedAnimePage';

import AnimeList from './pages/animelist';
import LikedAnimesPage from './pages/LikedAnimePage.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import WishListPage from './pages/WishListPage.jsx';
import AboutUs from './pages/AboutUs';

const AppItself = () => {
  const currPage = useLocation();
  const showNavbar = (
    (currPage.pathname === '/mainmenu') ||
    (currPage.pathname === '/animelist') ||
    (currPage.pathname === '/likedanime') ||
    (currPage.pathname === '/wishlist') ||
    (currPage.pathname === '/aboutus')
  );

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/mainmenu" element={<MainMenu />} />
        <Route path="/animelist" element={<AnimeList />} />
        <Route path="/likes" element={<LikedAnimesPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/reco" element={<Rec />} />
        <Route path="/test" element={<Test />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppItself />
    </Router>

  );
};

export default App;
