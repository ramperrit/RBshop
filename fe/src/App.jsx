import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage';
import { MAIN } from './constants/page_constants';


function App() {
  return (
    <>
    <Routes>
      <Route path={MAIN} element={<MainPage/>}/>
    </Routes>
    </>
  );
}

export default App;
