import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
//４択
function Choices(props) {
  const navigate = useNavigate();
  const [num, setNum] = useState();
  const [choice, setChoice] = useState();
  const [isHidden, setIsHidden] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [datas, setDatas] = useState()
  const width = window.innerWidth*0.7
  const styleA = {padding:10, margin:10, cursor: "pointer", width:width, fontWeight:"bold", justifyContent:"center", color:"white", height:"30px", display:'flex', alignItems:"center", backgroundColor:"#FA2A2A"}
  const styleB = {padding:10, margin:10, cursor: "pointer", width:width, fontWeight:"bold", justifyContent:"center", color:"white", height:"30px", display:'flex', alignItems:"center", backgroundColor:"#FF8000"}
  const styleC = {padding:10, margin:10, cursor: "pointer", width:width, fontWeight:"bold", justifyContent:"center", color:"white", height:"30px", display:'flex', alignItems:"center", backgroundColor:"#FFB800"}
  const styleD = {padding:10, margin:10, cursor: "pointer", width:width, fontWeight:"bold", justifyContent:"center", color:"white", height:"30px", display:'flex', alignItems:"center", backgroundColor:"#01426C"}
  const styleE = {padding:10, margin:10, cursor: "pointer", width:width, fontWeight:"bold", justifyContent:"center", color:"white", height:"30px", display:'flex', alignItems:"center", backgroundColor:"black", background:"gray"}

  useEffect(()=>{
    setDatas(JSON.parse(localStorage.getItem("quiz_my_quiz")))
    setIsHidden(props.quiz?.end)
    if (isLast) {
      navigate("/finish")
      window.location.reload()
      return
    };
    setChoice()
    setIsLast(props.quiz?.last)
  },[props])

  const handleClik = () => {
    datas.answer[props.quiz.No] = num
    datas.score += num=="○" ? props.quiz.score:0
    localStorage.setItem("quiz_my_quiz",JSON.stringify(datas))
    setIsHidden(true)
  }

  const handleResultClick = (event) => {
    event.preventDefault()
    navigate('/finish')
  }

  return (
    <div>
      {
        props.quiz?(
          <div style={{display:"flex", justifyContent:'center', alignItems:'center', height:window.innerHeight}}>
            <div hidden={isHidden}>

              <div style={{display:"flex", justifyContent:'center', alignItems:'center'}}>
                <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#FA2A2A"}}></div>
                <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#01426C"}}></div>
                <div style={{fontSize:"40px", fontWeight: "bold"}}>Q{props.quiz.No}</div>
                <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#FFB800"}}></div>
                <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#FF8000"}}></div>
              </div>

              <div style={{display:"flex", justifyContent:'center', alignItems:'center', flexDirection: "column", padding: "8px 40px",}}>
                <div style={choice == "A" ? styleE:styleA} onClick={()=>{props.quiz.a == "A" ? setNum("○") : setNum("×"); setChoice("A")}}>  {props.quiz.A}</div>
                <div style={choice == "B" ? styleE:styleB} onClick={()=>{props.quiz.a == "B" ? setNum("○") : setNum("×"); setChoice("B")}}>  {props.quiz.B}</div>
                <div style={choice == "C" ? styleE:styleC} onClick={()=>{props.quiz.a == "C" ? setNum("○") : setNum("×"); setChoice("C")}}>  {props.quiz.C}</div>
                <div style={choice == "D" ? styleE:styleD} onClick={()=>{props.quiz.a == "D" ? setNum("○") : setNum("×"); setChoice("D")}}>  {props.quiz.D}</div>
                <button onClick={handleClik} style={{borderRadius: "80px",fontSize: "10px", padding: "8px 40px", color: "white", backgroundColor: "black", fontWeight: "bold", marginTop: "20px"}}>回答</button>
              </div>
            </div>
            <div hidden={!isHidden} >
              <div style={{display:"flex", flexDirection: "column", alignItems:"center"}}>
                <div style={{fontWeight:"bold"}}>次の問題が出るまでお待ち下さい</div>
                <div style={{display:"flex"}}>
                  <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#FA2A2A"}}></div>
                  <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#01426C"}}></div>
                  <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#FFB800"}}></div>
                  <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#FF8000"}}></div>
                </div>
                <button style={{display: isLast ? "block" : "none"}} onClick={handleResultClick}>
                  結果画面へ
                </button>
              </div>
            </div>
          </div>
        ):(
          <></>
        )
      }
    </div>

  )
}

export default Choices