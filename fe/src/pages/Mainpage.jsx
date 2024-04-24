import { useEffect, useState } from "react";
import Footer from "../constants/Footer";
import Header from "../constants/Header";
import "../constants/layout1.css";
import axios from "axios";
import { MAIN_INIT_DATA_API } from "../constants/api_constants";


export default function Mainpage(){
  const [initData, setInitData] = useState("서버통신에러");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchInitData = async () => {
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
    <div className="content">
      <h1>메인페이지</h1>
      <h3>{initData}</h3>
    </div>
    <Footer/>
    </>
  );
}