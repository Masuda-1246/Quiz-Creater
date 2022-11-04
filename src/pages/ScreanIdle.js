import React from 'react'
import { useNavigate, useLocation } from "react-router-dom"



function ScreanIdle() {
  const navigate = useNavigate()
  const locate = useLocation()
  const room_id = locate.state.room_id
  const handleClik = () => {
    navigate("/result",{state:{room_id:locate.state.room_id}})
  }

  return (
    <div>
      <div>
      問題はこれで終わりです。
      みなさん、提出してください
      </div>
      <button onClick={handleClik}>結果発表</button>
    </div>
  )
}

export default ScreanIdle