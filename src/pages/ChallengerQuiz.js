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
  const [question, setquestion] = useState();
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    const data_ref = ref(database, 'users/' + location.state.roomID)
    onValue(data_ref,(snapshot) => {
      setquestion(snapshot.val());
      if (snapshot.val().quiz != "false") {
        setIsHidden(false)
      }
    })
  },[]);


  return (
    <div style={{backgroundColor: "#D9D9D9", height:window.innerHeight}}>
        <div hidden={!isHidden}>
          <div style={{display:"flex"}}>
            <div style={{backgroundColor:"#FA2A2A", height:"10px", width:'50%'}}/>
            <div style={{backgroundColor:"#01426C", height:"10px", width:'50%'}}/>
          </div>
          <Standby text="準備しています…" />……
          <div style={{display:"flex", position:"absolute", bottom:0, width:"100%"}}>
            <div style={{backgroundColor:"#FF8000", height:"10px", width:'50%'}}/>
            <div style={{backgroundColor:"#FFB800", height:"10px", width:'50%'}}/>
          </div>
        </div>
        <div hidden={isHidden}>
          <Choices quiz={question?.quiz} />
        </div>
    </div>
  )
}

export default ChallengerQuiz