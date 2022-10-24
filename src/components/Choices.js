import React from 'react'
import { useState, useEffect } from "react";
//４択
function Choices(props) {
  const [num, setNum] = useState();
  const [choice, setChoice] = useState();
  const scoreNo = "score" + props.num;
  const choiceNo = "choice" + props.num;
  console.log(num)
  let result = {
    num: num,
    choice: choice,
    score: props.score,
  }
  localStorage.setItem(props.num, JSON.stringify(result));

  return (
    <div>
      <button onClick={()=>{props.answer == "A" ? setNum("〇") : setNum("×"); setChoice("A")}}>問１　{props.text1}</button>
      <button onClick={()=>{props.answer == "B" ? setNum("〇") : setNum("×"); setChoice("B")}}>問２　{props.text2}</button>
      <button onClick={()=>{props.answer == "C" ? setNum("〇") : setNum("×"); setChoice("C")}}>問３　{props.text3}</button>
      <button onClick={()=>{props.answer == "D" ? setNum("〇") : setNum("×"); setChoice("D")}}>問４　{props.text4}</button>
    </div>
  )
}

export default Choices