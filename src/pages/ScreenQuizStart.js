import React from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import { ref, set } from "firebase/database";
import {database} from "../firebase"
import Quiz from "../images/quiz.png"
import line from "../images/line.png"

//注意事項
//スタート画面
const QuizStart = () => {
  const locate = useLocation()
  const navigate = useNavigate()
  const handleClik = () => {
    const data_ref = ref(database, 'users/' + locate.state.room_id)
    let data = locate.state.quiz[0]
    data["last"] = false
    data["end"] = false
    set(data_ref,{
      quiz:data
    })
    navigate("/quiz", {state:{quiz:locate.state.quiz, room_id:locate.state.room_id,len:locate.state.len}})
  }
  return (
    <div style={{position:"relative", backgroundColor: "#D9D9D9", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <div style={{position:"absolute", display:"flex"}}>
        <img style={{marginRight:"50px"}} src={Quiz} alt="quiz"/>
        <div style={{textAlign:"center", marginLeft:"50px"}}>
          <h2>Room ID</h2>
          <div style={{backgroundColor: "white", padding:"10px 90px", fontSize:"40px", color: "red", borderRadius:"80px", fontWeight:"bold"}}>{locate.state.room_id}</div>
          <button style={{backgroundColor: "black", color: "white", padding:"7px 30px", borderRadius:"80px",marginTop:"30px"}} onClick={handleClik}>クイズを開始する</button>
        </div>
      </div>
      <img src={line} style={{}} />
    </div>
  )
}

export default QuizStart