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
        localStorage.removeItem("quiz_my_quiz")
        localStorage.setItem("quiz_my_quiz",JSON.stringify(localData))
        navigate('quiz_c',{state: {roomID:room}});
      } else {
        setError("Roomが存在しません");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

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
        <div style={{display: "flex",minHeight: "100vh",flexDirection: "column", justifyContent: "center" , alignItems: "center"}}>
          <div style={{fontSize: "50px", fontWeight:"bold"}}>Kahoot!!</div>
          <form onSubmit={handleSubmit}>
            <input style={{border: "none", borderRadius: "80px", padding: "15px 30px", marginTop: "20px"}} type="text" placeholder="ルームIDを入力" name="roomID" />
            <div style={{textAlign: "center"}}>
            <button style={{borderRadius: "80px",fontSize: "10px", padding: "8px 40px", color: "white", backgroundColor: "black", fontWeight: "bold", marginTop: "50px"}}>参加する</button>
            </div>
          </form>
          <p>{error}</p>
        </div>
      </div>
      <div style={headerAfter}></div>
    </div>
  )
}

export default ChallengerRoom