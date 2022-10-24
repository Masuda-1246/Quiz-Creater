import React,{useState} from 'react'
import * as XLSX from "xlsx";
import {useNavigate} from "react-router-dom"
import { ref, set } from "firebase/database";
import {database} from "../firebase"
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
      flag:'false'
    })
    console.log(room_id)
    console.log(datas)
    navigate("/quiz_starter",{state:{quiz:datas, room_id:room_id, len:datas.length}})
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>ルームID</label>
        <input type="text"  name="room_id" onChange={(e)=>setText(e.target.value)}/>
        <br></br>
        <label>問題テンプレート</label>
        <input type="file" onChange={(e) => {
        e.preventDefault()
        handleReadFile(e.currentTarget.files[0])
        }}/>
        {
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
        }
        {
          (datas[0]) && (
            <button>次へ</button>
          )
        }
      </form>
    </div>
  )
}

export default Creater