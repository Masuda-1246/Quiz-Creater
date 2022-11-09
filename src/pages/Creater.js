import React,{useState} from 'react'
import * as XLSX from "xlsx";
import {useNavigate} from "react-router-dom"
import { ref, set } from "firebase/database";
import {database} from "../firebase"
import { getStorage } from "firebase/storage";
import line from "../images/line.png"

//room作成
//ファイル入力
function Creater() {
  const [datas, setDatas] = useState([])
  const [text, setText] = useState('')
  const navigate = useNavigate()
  const handleReadFile = (fileObj) => {
    if (fileObj) {
      fileObj.arrayBuffer().then((buffer) => {
        const workbook = XLSX.read(buffer, { type: 'buffer', bookVBA: true })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const data = XLSX.utils.sheet_to_json(worksheet)
        const json_data = JSON.stringify(data)
        setDatas(data)
      })
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const room_id = event.target.room_id.value
    const data_ref = ref(database, 'users/' + room_id)
    set(data_ref,{
      quiz:'false'
    })
    navigate("/quiz_starter",{state:{quiz:datas, room_id:room_id, len:datas.length}})
  } 
  return (
    <div style={{backgroundColor: "#D9D9D9", position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <form onSubmit={handleSubmit} style={{position: "absolute", textAlign:"center"}}>
        <div style={{display:"flex", marginTop:"150px", marginBottom:"50px"}}>
          <div style={{marginRight: "60px", marginTop:"-130px"}}>
            <div style={{fontSize:"30px", fontWeight:"bold", marginBottom:"40px"}}>ルームIDを設定する</div>
            <input style={{border:"none", padding:"10px 50px", borderRadius:"80px"}} placeholder="半角数字4桁で入力してください" type="text"  name="room_id" onChange={(e)=>setText(e.target.value)}/>
          </div>
          <div style={{marginLeft: "60px", marginTop:"-130px"}}>
            <div　style={{fontSize:"30px", fontWeight:"bold", marginBottom:"40px"}}>問題を設定する</div>
            <input type="file" onClick={(()=>{console.log("aaa")})} onChange={(e) => {
              console.log("aaa")
            e.preventDefault()
            handleReadFile(e.currentTarget.files[0])
            }}/>
          </div>
        </div>
        {/* {
          datas.map((data, index) =>
            <div key={index}>
              <p>問題{index+1}:{data.q}</p>
              <ul>
                <li>A:{data.A}</li>
                <li>B:{data.B}</li>
                <li>C:{data.C}</li>
                <li>D:{data.D}</li>
              </ul>
              <p>正解:{data.a} {data[data.a]}</p>
            </div>
          )
        } */}
        {/* {
          (datas[0]) && ( */}
            <button style={{backgroundColor:"black", color: "white", padding:"15px 40px", borderRadius:"80px"}}>送信する</button>
          {/* )
        } */}
      </form>
      <img src={line} style={{}} />
    </div>
  )
}

export default Creater