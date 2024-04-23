import { useState } from "react";
import Footer from "../constants/Footer";
import Header from "../constants/Header";
import "../static/css/layout.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_PAGE } from "../constants/page_constants";
import { SIGN_UP_API } from "../constants/api_constants";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("address", address);

      const response = await axios.post(
        API_BASE_URL + SIGN_UP_API,
        formData
      )

      alert(response.data);
      navigate(LOGIN_PAGE);
    } catch (error) {
      setError(error.response.data);
    }
  }

  return (
    <>
      <Header />
      <div class="content">
        <form onSubmit={handleSignup}>
          <div class="form-group">
            <label name="name">이름</label>
            <input type="text" value={name} class="form-control" placeholder="이름을 입력해주세요" required onChange={(e) => setName(e.target.value)} />
          </div>
          <div class="form-group">
            <label for="email">이메일주소</label>
            <input type="email" value={email} class="form-control" placeholder="이메일을 입력해주세요" required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input type="password" value={password} class="form-control" placeholder="비밀번호 입력" required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div class="form-group">
            <label for="address">주소</label>
            <input type="text" value={address} class="form-control" placeholder="주소를 입력해주세요" required onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div style= {{textAlign: "center"}} >
            <button type="submit" class="btn btn-primary" >Submit</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}