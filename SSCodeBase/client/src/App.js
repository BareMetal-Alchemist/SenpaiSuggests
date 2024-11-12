import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/loginPage';
import AnimeList from './pages/animelist';
import WishListPage from './pages/WishListPage.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import MainMenu from './pages/mainMenu';
import Signup from './pages/Signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/animelist" element={<AnimeList />} />
        <Route path="/mainmenu" element={<MainMenu />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Router>

  );
};

export default App;
