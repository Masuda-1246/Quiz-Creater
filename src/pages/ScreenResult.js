import React from 'react'
import {useLocation, useNavigate} from "react-router-dom"
//結果表示
function ScreenResult() {
  const locate = useLocation()
  const navigate = useNavigate()
  console.log(locate.state)
  return (
    <div>ScreenResult</div>
  )
}

export default ScreenResult