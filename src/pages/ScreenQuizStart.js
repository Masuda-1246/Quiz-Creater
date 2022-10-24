import React from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import { ref, set } from "firebase/database";
import {database} from "../firebase"
//注意事項
//スタート画面
const QuizStart = () => {
  const locate = useLocation()
  const navigate = useNavigate()
  console.log(locate.state)
  const handleClik = () => {
    const data_ref = ref(database, 'users/' + locate.state.room_id)
    set(data_ref,{
      quiz:locate.state.quiz[0]
    })
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