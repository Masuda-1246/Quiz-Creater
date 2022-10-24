import React,{useState, useEffect} from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import { ref, set, onValue } from "firebase/database";
import {database} from "../firebase"
//問題と4択表示
//次の問題に促す
function Quiz() {
  const locate = useLocation()
  const data_ref = ref(database, 'users/' + locate.state.room_id)
  const [datas, setDatas] = useState()
  console.log(locate.state)
  useEffect(()=>{
    onValue(data_ref, (snapshot) => {
      const data = snapshot.val();
      const fetch_data = Object.values(data)
      console.log(fetch_data)
      setDatas(fetch_data[0])
    });
  },[])
  const handleClik = () => {
    set(ref(database, 'users/' + locate.state.room_id), {
      quiz:locate.state.quiz[datas.No]
    });
  }
  return (
    <div>
      <div>問題：{datas?.q}</div>
      <div>A:{datas?.A}</div>
      <div>B:{datas?.B}</div>
      <div>C:{datas?.C}</div>
      <div>D:{datas?.D}</div>
      <button onClick={handleClik}>next</button>
    </div>
  )
}

export default Quiz