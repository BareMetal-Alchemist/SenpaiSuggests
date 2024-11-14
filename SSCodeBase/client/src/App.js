import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import AnimeList from './pages/animelist';
import MainMenu from './pages/mainMenu';
import LikedAnimesPage from './pages/LikedAnimesPage';
import Signup from './pages/Signup';
<<<<<<< HEAD
import AboutUs from './pages/AboutUs';
=======
import LikedAnimesPage from './pages/LikedAnimePage';
>>>>>>> 022cec72543ef96cab1d73ef3f5ace5c543d1bfb

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/animelist" element={<AnimeList />} />
        <Route path="/mainmenu" element={<MainMenu />} />
<<<<<<< HEAD
        <Route path="/likedanime" element={<LikedAnimesPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
=======
        <Route path="/likes" element={<LikedAnimesPage/>}/>
        <Route path="/register" element={<Signup />} />
>>>>>>> 022cec72543ef96cab1d73ef3f5ace5c543d1bfb
        
      </Routes>
    </Router>
  );
};

export default App;