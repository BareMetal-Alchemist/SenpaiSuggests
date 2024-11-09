import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import MainMenu from './pages/mainMenu';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mainmenu" element={<MainMenu />} />
        
      </Routes>
    </Router>
  );
};

export default App;