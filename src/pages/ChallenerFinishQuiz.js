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
    <div style={{marginTop:"50px", fontSize: "26px", fontWeight:"bold", textAlign:"center"}}>クイズ終了</div>
    <div style={{marginTop:"50px",  display:"flex", alignItems:"center", flexDirection:"column"}}>
      <div style={{ width:"80%", display:"flex", alignItems:"center", flexDirection:"column", borderRadius:"20px"}}>
        <div style={{backgroundColor:'white',padding:"9px 0", width: "220px", textAlign:"center", borderRadius:"10px 10px 0px 0px",margin:"1px"}}>回答一覧</div>
        {
          lists.map((list, index) => 
            <div style={{position:"relative",display:"flex",justifyContent:"center", backgroundColor:'white',padding:"9px 0", width: "220px", textAlign:"center",margin:"1px"}} key={index}>
              <div style={{position:"absolute", left:"20px"}}>{list.No}:</div>  
              <div style={{textAlign: "center", color:list.A == "○" ? "red":"blue", fontWeight: "bold"}}>{list.A}</div>
            </div>
          )
        }
        <div style={{backgroundColor:'white',padding:"9px 0", width: "220px", textAlign:"center", borderRadius:"0px 0px 10px 10px",margin:"1px"}}></div>
      </div>
        <div style={{marginTop: "10px"}}>あなたのスコア: <span style={{fontSize:"26px"}}>{score}</span></div>
        <form style={{textAlign:"center"}} onSubmit={handleSubmit}>
          <div style={{fontWeight:"bold", margin:"25px "}}>ニックネームを入力して<br></br>あなたの回答を提出しよう！</div>
          <input placeholder="ニックネームを入力して下さい" style={{border:"none", padding:"13px 30px", borderRadius:"80px"}} name="name" type="text" />
          <div>
            <button style={{border:"none", color:"white", backgroundColor:"black", borderRadius:"80px", padding:"8px 30px", marginTop:"30px"}}>提出する</button>
          </div>
        </form>
    </div>

    <div style={{display:"flex", position:"absolute", bottom:0, width:"100%"}}>
      <div style={{backgroundColor:"#FF8000", height:"10px", width:'50%'}}/>
      <div style={{backgroundColor:"#FFB800", height:"10px", width:'50%'}}/>
    </div>

</div>
  )
}

export default FinishQuiz