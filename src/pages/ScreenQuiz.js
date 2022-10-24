import React,{useState, useEffect} from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import { ref, set, onValue } from "firebase/database";
import {database} from "../firebase"
//問題と4択表示
//次の問題に促す
function Quiz() {
  const locate = useLocation()
  const navigate = useNavigate()
  const data_ref = ref(database, 'users/' + locate.state.room_id)
  const [datas, setDatas] = useState()
  const [isQuestion, setIsQuestion] = useState(false)
  const [isLast, setIsLast] = useState(false)
  // console.log(locate.state)
  useEffect(()=>{
    onValue(data_ref, (snapshot) => {
      const data = snapshot.val();
      const fetch_data = Object.values(data)
      // console.log(fetch_data)
      setDatas(fetch_data[0])
    });
  },[])
  const handleNextButton = () => {
    if (isLast) {
      navigate('/result')
      return
    }
    setIsQuestion(false)
    let lis = locate.state.quiz[datas.No]
    lis["last"] = lis.No == locate.state.len ? true:false
    setIsLast(lis.No == locate.state.len ? true:false)
    set(ref(database, 'users/' + locate.state.room_id), {
      quiz:lis
    })
  }
  const handleAnswerButton = () => {
    setIsQuestion(true)
  }
  return (
    <div>
      <div hidden={isQuestion}>
        <div>問題：{datas?.q}</div>
        <div>A:{datas?.A}</div>
        <div>B:{datas?.B}</div>
        <div>C:{datas?.C}</div>
        <div>D:{datas?.D}</div>
        <button onClick={handleAnswerButton}>答え</button>
      </div>
      <div hidden={!isQuestion} id="answer">
        <div>答え: {datas?.a} {datas?.[datas?.a]}</div>
        <button onClick={handleNextButton}>next</button>
      </div>
    </div>
  )
}

export default Quiz