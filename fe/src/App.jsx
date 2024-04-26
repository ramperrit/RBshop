import { Route, Routes } from 'react-router-dom';
import Mainpage from './pages/Mainpage';
import { LOGIN, MAIN, SIGN_UP } from './constants/page_constants';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
    <Routes>
      <Route path={MAIN} element={<Mainpage/>}/>
      <Route path={SIGN_UP} element={<SignupPage/>}/>
      <Route path={LOGIN} element={<LoginPage/>}/>
    </Routes>
    </>
  );
}

export default App;