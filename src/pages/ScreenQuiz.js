import React from 'react'
import {useLocation, useNavigate} from "react-router-dom"
//問題と4択表示
//次の問題に促す
function Quiz() {
  const locate = useLocation()
  const navigate = useNavigate()
  console.log(locate.state)
  return (
    <div>Quiz</div>
  )
}

export default Quiz