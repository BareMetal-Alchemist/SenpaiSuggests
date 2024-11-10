import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import MainMenu from './pages/mainMenu';
import Signup from './pages/Signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mainmenu" element={<MainMenu />} />
        <Route path="/signup" element={<Signup />} />
        
      </Routes>
    </Router>
  );
};

export default App;