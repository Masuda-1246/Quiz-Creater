import React, { useState, useEffect }from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"


function ScreanIdle() {
  const navigate = useNavigate()
  const locate = useLocation()
  const room_id = locate.state.room_id
  const handleClik = () => {
    navigate("/result",{state:{room_id:locate.state.room_id}})
  }
  const rank = async() => {
    const q = query(collection(db, room_id));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }
  rank()

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