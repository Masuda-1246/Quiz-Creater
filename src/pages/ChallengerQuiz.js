import React from 'react';
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Standby from "../components/Standby"
import Choices from "../components/Choices"
//Challengerがクイズに答える
//４択表示
//realtime database からデータ受け取り
//少しお待ちください
function ChallengerQuiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const [num, setNum] = useState();   //何問目
  const [text, setText] = useState("少しお待ちください");

  useEffect(() => {
    const data_ref = ref(database, 'users/' + location.state.roomID)
    onValue(data_ref,(snapshot) => {
      setNum(snapshot.val());
      console.log(snapshot.val().quiz)
    })
  },[]);



  console.log(num);
  console.log(localStorage.getItem('2'));
  return (
    <div>
      {num?.quiz == "false" ?  <Standby text={text} /> : <Choices text1={num?.quiz.A} text2={num?.quiz.B} text3={num?.quiz.C} text4={num?.quiz.D} num={num?.quiz.No} answer={num?.quiz.a} score={num?.quiz.score} />}
      <button style={{display: num?.quiz.last == true ? "block" : "none"}} onClick={()=>{navigate('/finish')}}>
        回答を見る
      </button>
    </div>
  )
}

export default ChallengerQuiz