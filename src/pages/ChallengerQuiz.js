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
    <div>
      <div hidden={!isHidden}>
        <Standby text="問題が始まるまで少々お待ちください" />
      </div>
      <div hidden={isHidden}>
        <Choices quiz={question?.quiz} />
      </div>
    </div>
  )
}

export default ChallengerQuiz