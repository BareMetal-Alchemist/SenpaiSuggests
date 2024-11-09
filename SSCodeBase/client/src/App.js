import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/loginPage';
import GoogleAuth from './Components/GoogleAuth.jsx';
import WishListPage from './pages/WishListPage.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import LoginForm from './Components/loginForm.jsx';
import './App.css'

const App = () => {
  return (
/*
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<Login />} />
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
