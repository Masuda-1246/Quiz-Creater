import React, { useState, useEffect } from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"
//結果表示
function ScreenResult() {
  const locate = useLocation()
  const room_id = locate.state.room_id
  const [datas, setDatas] = useState([])
  const list = []
  const rank = async() => {
    const q = query(collection(db, room_id));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      list.push(doc.data())
    });
    let top_score = list[0].score
    let top_name = []
    for (let i in list) {
      if (list[i].score == top_score) {
        top_name.push(list[i].name)
      } else if (list[i].score > top_score) {
        top_name = []
        top_name.push(list[i].name)
        top_score = list[i].score
      }
    }
    setDatas(top_name)
  }
  useEffect(()=>{
    rank()
  },[])
  return (
    <div>
      <div>
        最終結果はこちら
      </div>
      {
        datas.map((data, index)=>
          <div key={index}>
            {data}
          </div>
        )
      }
    </div>
  )
}

export default ScreenResult