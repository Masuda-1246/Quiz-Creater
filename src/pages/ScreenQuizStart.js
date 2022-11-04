import React from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import { ref, set } from "firebase/database";
import {database} from "../firebase"
import Quiz from "../images/quiz.png"
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
    <div>
      <h1>クイズを開始します</h1>
      <h2>Room ID : {locate.state.room_id}</h2>
      <img src={Quiz} alt="quiz"/>
      <button onClick={handleClik}>開始</button>
    </div>
  )
}

export default QuizStart