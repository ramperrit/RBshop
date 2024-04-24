import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../constants/Header";
import Footer from "../constants/Footer";
import "../constants/layout1.css";
import { TextFiled } from "../components/TextField";
import { MAIN, SIGN_UP } from "../constants/page_constants";
import axios from "axios";
import { LOGIN_API } from "../constants/api_constants";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        API_BASE_URL + LOGIN_API,
        formData
      )
      console.log(response.data);

      localStorage.setItem("access_token",response.data.accessToken);
      localStorage.setItem("refresh_token",response.data.refreshToken);
      localStorage.setItem("authority",response.data.authority);

      navigate(MAIN);
    
    }catch(error){
      console.error(error);
      setError("이메일, 비밀번호 오류");
    }
  }

  return (
    <>
      <Header />
      <div className="content">
        <form onSubmit={handleLogin}>
          <TextFiled
            label="이메일"
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextFiled
            label="비밀번호"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">로그인</button>
          <button type="button" className="btn btn-primary" onClick={navigate(SIGN_UP)}>회원가입</button>
        </form>
      </div>
      <Footer />
    </>
  );
}