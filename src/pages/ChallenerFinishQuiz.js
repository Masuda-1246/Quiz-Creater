import React,{ useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { db } from "../firebase"
import { collection, addDoc } from 'firebase/firestore';

function FinishQuiz() {
  const navigate = useNavigate();
  const result = JSON.parse(localStorage.getItem("quiz_my_quiz"))
  const [lists, setLists] = useState([])
  console.log(result)
  const room = result.room
  const answer = result.answer
  const score = result.score
  useEffect(()=>{
    const list = []
    for (let i in Object.keys(answer)) {
      const data = {
        No:`Q${Object.keys(answer)[i]}`,
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

    <div style={{backgroundColor: "#D9D9D9", height:window.innerHeight}}>

    <div style={{display:"flex"}}>
      <div style={{backgroundColor:"#FA2A2A", height:"10px", width:'50%'}}/>
      <div style={{backgroundColor:"#01426C", height:"10px", width:'50%'}}/>
    </div>
    <div style={{fontSize: "30px", fontWeight:"bold"}}>クイズ終了</div>
    <div style={{backgroundColor:'white', width:"80%", display:"flex", alignItems:"center", flexDirection:"column"}}>
      {
        lists.map((list, index) => 
          <div key={index}>{list.No}:  {list.A}</div>
        )
      }
    </div>
      <div>あなたのスコア: {score}</div>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" />
        <button>送信</button>
      </form>

    <div style={{display:"flex", position:"absolute", bottom:0, width:"100%"}}>
      <div style={{backgroundColor:"#FF8000", height:"10px", width:'50%'}}/>
      <div style={{backgroundColor:"#FFB800", height:"10px", width:'50%'}}/>
    </div>

</div>
  )
}

export default FinishQuiz