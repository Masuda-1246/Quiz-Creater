import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
//４択
function Choices(props) {
  const [num, setNum] = useState();
  const [choice, setChoice] = useState();
  const [isHidden, setIsHidden] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [datas, setDatas] = useState()
  const scoreNo = "score" + props.num;
  const choiceNo = "choice" + props.num;
  const navigate = useNavigate();
  const styleA = {border:"solid", padding:10, margin:10, cursor: "pointer", color:"red"}
  const styleB = {border:"solid", padding:10, margin:10, cursor: "pointer", color:"green"}
  const styleC = {border:"solid", padding:10, margin:10, cursor: "pointer", color:"blue"}
  const styleD = {border:"solid", padding:10, margin:10, cursor: "pointer", color:"orange"}
  const styleClick = {border:"solid", padding:10, margin:10, cursor: "pointer", color:"black", background:"gray"}

  useEffect(()=>{
    setDatas(JSON.parse(localStorage.getItem("quiz_my_quiz")))
    if (isLast) navigate("/finish");
    setIsHidden(false)
    setChoice()
  },[props])
  console.log(datas)
  console.log(props.num)
  const handleClik = () => {
    datas.answer[props.num] = num
    datas.score += props.score
    console.log(datas)
    localStorage.setItem("quiz_my_quiz",JSON.stringify(datas))
    setIsLast(props.last)
    setIsHidden(true)
  }
  let result = {
    num: num,
    choice: choice,
    score: props.score,
  }
  localStorage.setItem(props.num, JSON.stringify(result));

  return (
    <div>
      <div hidden={isHidden}>
        <div>{props.quiz}</div>
        <div style={choice == "A" ? styleClick:styleA} onClick={()=>{props.answer == "A" ? setNum("〇") : setNum("×"); setChoice("A")}}>A  {props.text1}</div>
        <div style={choice == "B" ? styleClick:styleB} onClick={()=>{props.answer == "B" ? setNum("〇") : setNum("×"); setChoice("B")}}>B  {props.text2}</div>
        <div style={choice == "C" ? styleClick:styleC} onClick={()=>{props.answer == "C" ? setNum("〇") : setNum("×"); setChoice("C")}}>C  {props.text3}</div>
        <div style={choice == "D" ? styleClick:styleD} onClick={()=>{props.answer == "D" ? setNum("〇") : setNum("×"); setChoice("D")}}>D  {props.text4}</div>
        <button onClick={handleClik}>回答</button>
      </div>
      <div hidden={!isHidden}>次の問題まで少しお待ちください</div>
    </div>

  )
}

export default Choices