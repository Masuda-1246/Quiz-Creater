import React,{ useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { db } from "../firebase"
import { collection, addDoc } from 'firebase/firestore';

function FinishQuiz() {
  const navigate = useNavigate();
  const result = JSON.parse(localStorage.getItem("quiz_my_quiz"))
  const [lists, setLists] = useState([])
  const room = result.room
  const answer = result.answer
  const score = result.score
  useEffect(()=>{
    const list = []
    for (let i in Object.keys(answer)) {
      const data = {
        No:`${Object.keys(answer)[i]} 問目`,
        A:Object.values(answer)[i]
      }
      list.push(data)
    }
    setLists(list)
  },[])

  const handleSubmit = async(event) => {
    event.preventDefault();
    const name = event.target.name.value;
    let list = {
      name : name,
      score:score
    }
    localStorage.removeItem("quiz_my_quiz")
    navigate('/result_c')
    await addDoc(collection(db,room),list,{merge: true})
  }

  return (
    <div>
      <div>あなたの結果</div>
      {
        lists.map((list, index) => 
          <div key={index}>{list.No} {list.A}</div>
        )
      }
      <div>あなたのスコア: {score}</div>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" />
        <button>送信</button>
      </form>
    </div>
  )
}

export default FinishQuiz