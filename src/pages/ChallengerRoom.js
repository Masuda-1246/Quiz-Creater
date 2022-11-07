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


  return (
    <div style={{backgroundColor: "#D9D9D9", height:window.innerHeight}}>

        <div style={{display:"flex"}}>
          <div style={{backgroundColor:"#FA2A2A", height:"10px", width:'50%'}}/>
          <div style={{backgroundColor:"#01426C", height:"10px", width:'50%'}}/>
        </div>

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

        <div style={{display:"flex", position:"absolute", bottom:0, width:"100%"}}>
          <div style={{backgroundColor:"#FF8000", height:"10px", width:'50%'}}/>
          <div style={{backgroundColor:"#FFB800", height:"10px", width:'50%'}}/>
        </div>

    </div>
  )
}

export default ChallengerRoom