import React from 'react';
import { ref, get } from "firebase/database";
import { database } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//roomID入力
function ChallengerRoom() {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const room = event.target.roomID.value;
    const data_ref = ref(database, 'users/' + room)
    const localData = {
      room:room,
      answer:{},
      score:0
    }
    get(data_ref).then((snapshot) => {
      if (snapshot.exists()) {
        setError();
        localStorage.setItem("quiz_my_quiz",JSON.stringify(localData))
        navigate('quiz_c',{state: {roomID:room}});
      } else {
        setError("Roomが存在しません");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <div>
      <div>ChallengerRoom</div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="roomID" />
        <button>roomに入る</button>
      </form>
      <p>{error}</p>
    </div>
  )
}

export default ChallengerRoom