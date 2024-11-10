import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GoogleAuth from './Components/GoogleAuth.jsx';
import WishListPage from './pages/WishListPage.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import LoginPage from './pages/loginPage';
import AnimeList from './pages/animelist';


const App = () => {
  return (
/*
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/animelist" element={<AnimeList />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
*/

    <>
      <WishListPage />
    </>
  );
};

export default App;
