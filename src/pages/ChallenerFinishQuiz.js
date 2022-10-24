import React,{useState, useEffect} from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import { ref, set, onValue } from "firebase/database";
import {database} from "../firebase";
import { getDoc, doc, setDoc } from 'firebase/firestore';

//Challengerが結果を送信する画面
function FinishQuiz() {
  const [data, setData] = useState();
  let myScore = 0;
  let result = [];
  
  console.log(localStorage)
  for (let i = 1; i < 4; i++) {
    var list = localStorage.getItem(i);
    list = JSON.parse(list);

      result.push([i+"問目",list.choice])
      myScore += list[0] == "〇" ? list[2] : 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    let list = {
      name : name,
      score : myScore
    }
    setDoc(doc(database),list,{merge: true});
  }

  return (
    <div>
      <div>結果</div>
      {
        result.map((list, index) => 
          <div key={index}>{list[0]}{list[1]}</div>
        )
      }
      <form>
        <input name="name" type="text" />
        <button>送信</button>
      </form>
    </div>
  )
}

export default FinishQuiz