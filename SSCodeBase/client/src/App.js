import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/loginPage';
import MainMenu from './pages/mainMenu';
import Navbar from './Components/Navbar.jsx';
import Signup from './pages/Signup';
import Rec from './pages/reco';
import LikedAnimesPage from './pages/LikedAnimePage.jsx';
import AnimeList from './pages/animelist';
import PageNotFound from './pages/PageNotFound.jsx';
import WishListPage from './pages/WishListPage.jsx';
import AboutUs from './pages/AboutUs';

const AppContent = () => {
  const currPage = useLocation();
  const showNavbar = (
    (currPage.pathname === '/mainmenu') ||
    (currPage.pathname === '/animelist') ||
    (currPage.pathname === '/likes') ||
    (currPage.pathname === '/wishlist') ||
    (currPage.pathname === '/reco') ||
    (currPage.pathname === '/lucky') ||
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
      <AppContent />
    </Router>

  );
};

export default App;
