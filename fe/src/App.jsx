import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage';
import { LOGIN_PAGE, MAIN, SIGN_UP_PAGE } from './constants/page_constants';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';


function App() {
  return (
    <>
    <Routes>
      <Route path={MAIN} element={<MainPage/>}/>
      <Route path={LOGIN_PAGE} element={<LoginPage/>}/>
      <Route path={SIGN_UP_PAGE} element={<SignUpPage/>}/>
    </Routes>
    </>
  );
}

export default App;
