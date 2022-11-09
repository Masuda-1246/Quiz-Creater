import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import line2 from "../images/line2.png"
import crown from "../images/crown.png"
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
    <div style={{backgroundColor: "#D9D9D9", position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <div style={{position:"absolute", top: "150px"}}>
        <div style={{fontWeight:"bold", fontSize:"40px", textAlign:"center"}}>
          ランキング
        </div>
        <div style={{display: "flex", justifyContent:"space-around"}}>
          <div style={{boxShadow:"0px 5px 10px gray",backgroundColor: "white", borderRadius:"50%", width: "300px", height: "300px", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <img src={crown} />
            <div style={{fontSize:"33px", fontWeight:"bold", marginTop:"30px"}}>{datas[0]?.name}</div>
          </div>
          <div style={{margin:"30px",}}>

            {
              datas.map((data, index)=>
                <div key={index}>
                  <div style={{display: "flex"}}>
                    {data.ranking == 1 || data.ranking > 4 ?
                    <div>
                    </div>
                    :
                    <div>
                      <div style={{position:"relative", fontWeight:"bold",fontSize:"25px", backgroundColor: "white", boxShadow: "0px 5px 10px gray", margin:"10px", paddingTop:50-(data.ranking * 7) + "px" , paddingBottom:50-(data.ranking * 7) + "px", width: "370px", textAlign:"center"}}>
                        <span style={{position:"absolute", left:"15px"}}>{data.ranking}位</span> {data.name}さん
                      </div>
                    </div>
                  
                  
                  }
                  </div>
                </div>
              )
            }
          </div>
        </div>

      </div>
      <div style={{display: "flex",minHeight:"100vh",width:"100%",alignItems:"center", justifyContent:"space-around"}}>
        <img src={line2} style={{marginLeft:"-200px"}} />
        <img src={line2} style={{marginRight:"-200px"}} />
      </div>
    </div>
  )
}

export default ScreenResult