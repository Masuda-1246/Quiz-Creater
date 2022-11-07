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

  const header = {
    borderTop: "17px solid #FA2A2A",
    borderBottom: "17px solid #FF8000",
    position: "relative",
    height: "100vh"
  }
  const headerAfter = {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100vh",
    width: "50vw",
    borderTop: "17px solid #01426C",
    borderBottom: "17px solid #FFB800",
  }

  return (
    <div style={{backgroundColor: "#D9D9D9"}}>
      <div style={header}>
        <div hidden={!isHidden}>
          <Standby text="準備しています…" />……
        </div>
        <div hidden={isHidden}>
          <Choices quiz={question?.quiz} />
        </div>
      </div>
      <div style={headerAfter}></div>
    </div>
  )
}

export default ChallengerQuiz