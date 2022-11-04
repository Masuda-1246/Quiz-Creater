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
  const styleA = {border:"solid", padding:10, margin:10, cursor: "pointer", color:"red"}
  const styleB = {border:"solid", padding:10, margin:10, cursor: "pointer", color:"green"}
  const styleC = {border:"solid", padding:10, margin:10, cursor: "pointer", color:"blue"}
  const styleD = {border:"solid", padding:10, margin:10, cursor: "pointer", color:"orange"}
  const styleClick = {border:"solid", padding:10, margin:10, cursor: "pointer", color:"black", background:"gray"}

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
          <div>
            <div hidden={isHidden}>
              <div>{props.quiz.q}</div>
              <div style={choice == "A" ? styleClick:styleA} onClick={()=>{props.quiz.a == "A" ? setNum("〇") : setNum("×"); setChoice("A")}}>A  {props.quiz.A}</div>
              <div style={choice == "B" ? styleClick:styleB} onClick={()=>{props.quiz.a == "B" ? setNum("〇") : setNum("×"); setChoice("B")}}>B  {props.quiz.B}</div>
              <div style={choice == "C" ? styleClick:styleC} onClick={()=>{props.quiz.a == "C" ? setNum("〇") : setNum("×"); setChoice("C")}}>C  {props.quiz.C}</div>
              <div style={choice == "D" ? styleClick:styleD} onClick={()=>{props.quiz.a == "D" ? setNum("〇") : setNum("×"); setChoice("D")}}>D  {props.quiz.D}</div>
              <button onClick={handleClik}>回答</button>
            </div>
            <div hidden={!isHidden}>次の問題まで少しお待ちください
              <button style={{display: isLast ? "block" : "none"}} onClick={handleResultClick}>
                結果画面へ
              </button>
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