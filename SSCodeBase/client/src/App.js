import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import AnimeList from './pages/animelist';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/animelist" element={<AnimeList />} />
      </Routes>
    </Router>
  );
};

export default App;
