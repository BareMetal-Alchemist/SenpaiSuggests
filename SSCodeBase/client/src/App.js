import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import MainMenu from './Components/MainMenu';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mainmenu" element={<MainMenu />} />
        <Route path="/" element={<LoginPage />} />  
      </Routes>
    </Router>
  );
};

export default App;
