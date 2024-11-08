import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/loginPage';
import GoogleAuth from './Components/GoogleAuth.jsx';
import WishListPage from './pages/WishListPage.jsx';

export default function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>


/*
    <>
      <Login />
      <GoogleAuth />
    </>
*/

    // <WishListPage />
  );
};
