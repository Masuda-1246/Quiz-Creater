import { ref, push, onValue } from "firebase/database";
import {database} from "./firebase"
import {useState} from "react"

function App() {
  const [datas, setDatas] = useState(['s'])
  const data_ref = ref(database, 'users/' + '000')

  const hundleSubmit = (event) => {
    event.preventDefault()
    const message = event.currentTarget.message.value
    console.log(message)
    push(ref(database, 'users/' + '000'), {
      message:message
    });
  }

  onValue(data_ref, (snapshot) => {
    const data = snapshot.val();
    const fetch_data = Object.values(data)
    setDatas(fetch_data)
  },{onlyOnce:true});

  return (
    <div className="App">
      <h1>Chatアプリ</h1>
      <form onSubmit={hundleSubmit}>
        <input type="text" name="message" />
        <button>Send</button>
      </form>
      {
        datas.map((data, index)=>
        <p key={index}>{data.message}</p>
        )
      }
    </div>
  );
}

export default App;
