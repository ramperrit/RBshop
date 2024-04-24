import { useState } from "react";
import { TextFiled } from "../components/TextField";
import Footer from "../constants/Footer";
import Header from "../constants/Header";
import "../constants/layout1.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SIGN_UP_API } from "../constants/api_constants";
import { LOGIN } from "../constants/page_constants";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try{
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("address", address);

      const response = await axios.post(
        API_BASE_URL + SIGN_UP_API,
        formData
      )

      navigate(LOGIN);
    }catch(error){
      setError(error.response.data);
    }
  }


  return (
    <>
    <Header/>
    <div className="content">
      <form onSubmit={handleSignup}>
          <TextFiled
            label="이름"
            type="text"
            name="name"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange = {(e) => setName(e.target.value)}
            />
        <TextFiled
            label="이메일"
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange = {(e) => setEmail(e.target.value)}
            />
        <TextFiled
            label="비밀번호"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange = {(e) => setPassword(e.target.value)}
            />
        <TextFiled
            label="주소"
            type="text"
            name="address"
            placeholder="주소를 입력해주세요"
            value={address}
            onChange = {(e) => setAddress(e.target.value)}
            />
        <div style={{textAlign: "center"}}>
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
      </div>
      <Footer/>
    </>
  );
}