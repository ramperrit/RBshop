import Header from '../constants/Header';
import Footer from '../constants/Footer';
import "../static/css/layout.css";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LOGIN_API } from '../constants/api_constants';
import { MAIN, SIGN_UP_PAGE } from '../constants/page_constants';


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      //서버로 이메일 비밀번호 보내기
      const response = await axios.post(
        API_BASE_URL + LOGIN_API,
        formData
      )
      console.log(response.data);

      navigate(MAIN);

    } catch (error) {
      console.error(error);
      setError("이메일, 비밀번호 오류");
    }
  }

  return (
    <>
      <Header />
      <div class="content">
        <form onSubmit={handleLogin}>
          <div class="form-group">
            <label name="email">이메일주소</label>
            <input type="email" name="email" class="form-control" placeholder="이메일" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div class="form-group">
            <label name="password">비밀번호</label>
            <input type="password" name="password" class="form-control" placeholder="비밀번호" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button class="btn btn-primary">로그인</button>
        <Link to={SIGN_UP_PAGE}><button class="btn btn-primary">회원가입</button></Link>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;