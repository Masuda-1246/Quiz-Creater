import React from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import line from "../images/line.png"


function ScreanIdle() {
  const navigate = useNavigate()
  const locate = useLocation()
  const room_id = locate.state.room_id
  const handleClik = () => {
    navigate("/result",{state:{room_id:locate.state.room_id}})
  }

  return (
    <div style={{backgroundColor: "#D9D9D9", position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <div style={{position:"absolute", textAlign:"center"}}>
        <div style={{fontWeight:"bold", fontSize:"30px"}}>
        問題はこれで終わりです。<br></br>
        ニックネームを入力して、提出してください
        </div>
        <button onClick={handleClik} style={{backgroundColor:"black", padding:"10px 40px", color:"white", borderRadius:"50px",fontWeight:"bold", marginTop:"80px"}}>ランキングを表示</button>
      </div>
      <img src={line} style={{}} />
    </div>
  )
}

export default ScreanIdle