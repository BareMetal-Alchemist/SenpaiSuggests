import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/loginPage';
import AnimeList from './pages/animelist';
import MainMenu from './pages/mainMenu';
import LikedAnimesPage from './pages/LikedAnimesPage';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/animelist" element={<AnimeList />} />
        <Route path="/mainmenu" element={<MainMenu />} />
        <Route path="/likedanime" element={<LikedAnimesPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Router>

  );
};

export default App;
