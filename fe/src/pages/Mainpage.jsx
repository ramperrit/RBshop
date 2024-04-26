import { useEffect, useState } from "react";
import Footer from "../constants/Footer";
import Header from "../constants/Header";
import "../constants/layout1.css";
import { MAIN_INIT_DATA_API } from "../constants/api_constants";
import fetcher from "../fetcher";


export default function Mainpage(){
  const [initData, setInitData] = useState("서버통신에러");

  const fetchInitData = async () => {
    try{
      const response = await fetcher.get(MAIN_INIT_DATA_API);
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