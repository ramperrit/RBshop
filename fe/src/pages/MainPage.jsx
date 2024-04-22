import { useEffect, useState } from "react";
import Footer from "../constants/Footer";
import Header from "../constants/Header";
import "../static/css/layout.css";
import axios from "axios";
import { MAIN_INIT_DATA_API } from "../constants/api_constants";

export default function MainPage(){
  const [initData, setInitData] = useState("서버 통신 에러");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchInitData = async () =>{
    try{
      const response = await axios.get(
        API_BASE_URL + MAIN_INIT_DATA_API
      );

      setInitData(response.data);
    }catch(error){
      console.error("데이터 가져오기 오류",error);
    }
  }

  useEffect(()=>{
    fetchInitData();
  },[]);

  return(
    <>
    <Header/>
    <div class="content">
      {initData}
    </div>
    <Footer/>
    </>
  );

}