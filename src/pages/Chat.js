import { ref, push, onValue } from "firebase/database";
import {database} from "../firebase"
import {useState, useEffect} from "react"
import Creater from "./Creater";

function Chat() {
  const [datas, setDatas] = useState(['s'])
  const [text, setText] = useState('')
  const data_ref = ref(database, 'users/' + '000')

  const hundleSubmit = (event) => {
    event.preventDefault()
    const message = event.currentTarget.message.value
    push(ref(database, 'users/' + '000'), {
      message:message
    });
    setText('')
  }
  useEffect(()=>{
    onValue(data_ref, (snapshot) => {
      const data = snapshot.val();
      const fetch_data = Object.values(data)
      setDatas(fetch_data)
    });
  },[])

  return (
    <div>
      <h1>Chatアプリ</h1>
      <form onSubmit={hundleSubmit}>
        <input type="text" name="message" value={text} onChange={(e)=>setText(e.value)}/>
        <button>Send</button>
      </form>
      {
        datas.map((data, index)=>
        <p key={index}>{data.message}</p>
        )
      }
    <Creater />
    </div>
  );
}

export default Chat;
