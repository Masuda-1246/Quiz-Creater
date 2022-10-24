import React from 'react'
import {useLocation, useNavigate} from "react-router-dom"
const QuizStart = () => {
  const locate = useLocation()
  const navigate = useNavigate()
  console.log(locate.state)
  const handleClik = () => {
    navigate("/quiz", {state:{quiz:locate.state.quiz, room_id:locate.state.room_id}})
  }
  return (
    <div>
      <h1>クイズを開始します</h1>
      <button onClick={handleClik}>開始</button>
    </div>
  )
}

export default QuizStart