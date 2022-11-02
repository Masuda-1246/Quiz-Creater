import React from 'react';
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Standby from "../components/Standby"
import Choices from "../components/Choices"

function ChallengerQuiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const [num, setNum] = useState();
  const [isHidden, setIsHidden] = useState(true)
  const hundleClick = (event) => {
    event.preventDefault()
    navigate('/finish')
  }

  useEffect(() => {
    const data_ref = ref(database, 'users/' + location.state.roomID)
    onValue(data_ref,(snapshot) => {
      setNum(snapshot.val());
      if (snapshot.val().quiz != "false") {
        setIsHidden(false)
      }
    })
  },[]);

  return (
    <div>
      <div hidden={!isHidden}>
        <Standby text="問題が始まるまで少々お待ちください" />
      </div>
      <div hidden={isHidden}>
        <Choices
          quiz={num?.quiz.q}
          text1={num?.quiz.A}
          text2={num?.quiz.B}
          text3={num?.quiz.C}
          text4={num?.quiz.D}
          num={num?.quiz.No}
          answer={num?.quiz.a}
          score={num?.quiz.score}
          last={num?.quiz.last}
          />
      </div>
      <button style={{display: num?.quiz.last ? "block" : "none"}} onClick={hundleClick}>
        結果画面へ
      </button>
    </div>
  )
}

export default ChallengerQuiz