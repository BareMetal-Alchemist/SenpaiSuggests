import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import AnimeList from './pages/animelist';
import MainMenu from './pages/mainMenu';
import Signup from './pages/Signup';
import Rec from './pages/reco';
import LikedAnimesPage from './pages/LikedAnimePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/animelist" element={<AnimeList />} />
        <Route path="/mainmenu" element={<MainMenu />} />
        <Route path="/likes" element={<LikedAnimesPage/>}/>
        <Route path="/reco" element={<Rec/>}/>
        <Route path="/register" element={<Signup />} />
        
      </Routes>
    </Router>
  );
};

export default App;