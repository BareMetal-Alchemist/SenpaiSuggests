import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/loginPage';
import MainMenu from './pages/mainMenu';
import Signup from './pages/Signup';
import AnimeList from './pages/animelist';
import LikedAnimesPage from './pages/LikedAnimesPage.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/mainmenu" element={<MainMenu />} />
        <Route path="/animelist" element={<AnimeList />} />
        <Route path="/likedanime" element={<LikedAnimesPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>

  );
};

export default App;
