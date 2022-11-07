import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase"
//結果表示
function ScreenResult() {
  const locate = useLocation()
  const room_id = locate.state.room_id
  const [datas, setDatas] = useState([])
  let list = []
  const rank = async() => {
    const q = query(collection(db, room_id));
    const querySnapshot = await getDocs(q)
    list = []
    querySnapshot.forEach((doc) => {
      list.push(doc.data())
    });
    list.sort((a,b)=>{
      return b.score - a.score
    })
    let ranking = 1
    let pre_ranking = ranking
    let score = list[0].score
    for (let i in list) {
      if (score != list[i].score) {
        pre_ranking = ranking
        score = list[i].score
      }
      ranking++
      list[i]["ranking"] = pre_ranking
    }
    console.log(list)
    setDatas(list)
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
            {data.ranking}位  名前：{data.name}さん
          </div>
        )
      }
    </div>
  )
}

export default ScreenResult