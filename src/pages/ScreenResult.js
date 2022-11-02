import React from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"
//結果表示
function ScreenResult() {
  const locate = useLocation()
  const room_id = locate.state.room_id
  const list = []
  const rank = async() => {
    const q = query(collection(db, room_id));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      list.push(doc.data())
    });
    console.log(list)
    let top_score = list[0].score
    let top_name = list[0].name
  }
  rank()
  console.log(locate.state.room_id)
  return (
    <div>
        最終結果はこちら
    </div>
  )
}

export default ScreenResult