import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import AnimeList from './pages/animelist';
import MainMenu from './pages/mainMenu';
import LikedAnimesPage from './pages/LikedAnimesPage';
import Signup from './pages/Signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/animelist" element={<AnimeList />} />
        <Route path="/mainmenu" element={<MainMenu />} />
        <Route path="/likedanime" element={<LikedAnimesPage />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
    </Router>
  );
};

export default App;