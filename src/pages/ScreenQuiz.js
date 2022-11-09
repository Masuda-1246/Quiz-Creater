import React,{useState, useEffect} from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import { ref, set, onValue } from "firebase/database";
import {database} from "../firebase"
//問題と4択表示
//次の問題に促す
function Quiz() {
  const locate = useLocation()
  const navigate = useNavigate()
  const data_ref = ref(database, 'users/' + locate.state.room_id)
  const [datas, setDatas] = useState()
  const [isQuestion, setIsQuestion] = useState(false)
  const [isLast, setIsLast] = useState(false)
  const color = {
    "A":"#FA2A2A",
    "B":"#FF8000",
    "C":"#FFB800",
    "D":"#01426C"
  }
  useEffect(()=>{
    onValue(data_ref, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetch_data = Object.values(data)
        setDatas(fetch_data[0])
      }
    });
  },[])
  const handleNextButton = () => {
    if (isLast) {
      navigate('/idle',{state:{room_id:locate.state.room_id}})
      set(ref(database, 'users/' + locate.state.room_id), {
        quiz:[]
      })
      return
    }
    setIsQuestion(false)
    let lis = locate.state.quiz[datas.No]
    lis["last"] = lis.No == locate.state.len ? true:false
    lis["end"] = false
    setIsLast(lis.No == locate.state.len ? true:false)
    set(ref(database, 'users/' + locate.state.room_id), {
      quiz:lis
    })
  }
  const handleAnswerButton = () => {
    let lis = locate.state.quiz[datas.No-1]
    lis["end"] = true
    set(ref(database, 'users/' + locate.state.room_id), {
      quiz:lis
    })
    setIsQuestion(true)
  }
  return (
    <div style={{backgroundColor: "#D9D9D9", minHeight:"100vh",display:"flex", flexDirection:"column", justifyContent:"center", alignContent:"center"}}>
      <div hidden={isQuestion} style={{textAlign:"center"}}>
        <div style={{fontSize:"50px", fontWeight:"bold", marginBottom:"30px"}}>{datas?.q}</div>
        <div style={{display:"flex", justifyContent:"space-between", margin:"30px 100px"}}>
          <div style={{fontWeight:"bold", fontSize:"30px"}}>Q{datas?.No}</div>
          <button style={{backgroundColor:"black", color:"white", borderRadius:"50px", padding:"5px 30px"}} onClick={handleAnswerButton}>答え</button>
        </div>
        <div>
          <div style={{display:"flex", justifyContent:"center"}}>
            <div style={{backgroundColor:"#FA2A2A", boxShadow:"3px 3px 10px gray", margin:"10px", width: "40%", padding:"30px 0", borderRadius:"3px", fontWeight:"bold", fontSize:"50px", color:"white"}}>{datas?.A}</div>
            <div style={{backgroundColor:"#FF8000", boxShadow:"3px 3px 10px gray", margin:"10px", width: "40%", padding:"30px 0", borderRadius:"3px", fontWeight:"bold", fontSize:"50px", color:"white"}}>{datas?.B}</div>
          </div>
          <div style={{display: "flex", justifyContent:"center"}}>
            <div style={{backgroundColor:"#FFB800", boxShadow:"3px 3px 10px gray", margin:"10px", width: "40%", padding:"30px 0", borderRadius:"3px", fontWeight:"bold", fontSize:"50px", color:"white"}}>{datas?.C}</div>
            <div style={{backgroundColor:"#01426C", boxShadow:"3px 3px 10px gray", margin:"10px", width: "40%", padding:"30px 0", borderRadius:"3px", fontWeight:"bold", fontSize:"50px", color:"white"}}>{datas?.D}</div>
          </div>
        </div>
      </div>
      <div hidden={!isQuestion} id="answer" style={{backgroundColor:color[datas?.a], minHeight:"100vh", display:isQuestion ? "flex" : "none", justifyContent:"center", alignItems:"center"}}>
        <div style={{width: "70%", height:"80vh", backgroundColor:"#D9D9D9", borderRadius:"20px", display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center",boxShadow:"3px 3px 5px 3px gray inset"}}>
          <div style={{color:color[datas?.a], fontSize:"120px", fontWeight:"bold", margin:"30px"}}>{datas?.[datas?.a]}</div>
          <button onClick={handleNextButton} style={{backgroundColor:"black", color:"white", borderRadius:"50px", padding:"10px 40px"}}>次の問題へ進む</button>
        </div>
      </div>
    </div>
  )
}

export default Quiz