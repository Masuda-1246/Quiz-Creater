import React from 'react'
import {useLocation, useNavigate} from "react-router-dom"
//結果表示
function ScreenResult() {
  const locate = useLocation()
  const navigate = useNavigate()
  setTimeout(()=>{navigate('/')},30000)
  return (
    <div>
      問題はこれで終わりです。
      みなさん、提出してください
    </div>
  )
}

export default ScreenResult