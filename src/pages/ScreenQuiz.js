import React from 'react'
import {useLocation, useNavigate} from "react-router-dom"

function Quiz() {
  const locate = useLocation()
  const navigate = useNavigate()
  console.log(locate.state)
  return (
    <div>Quiz</div>
  )
}

export default Quiz