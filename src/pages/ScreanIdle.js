import React from 'react'

import {useLocation, useNavigate} from "react-router-dom"
//結果表示
function ScreanIdle() {
  const locate = useLocation()
  const navigate = useNavigate()
  setTimeout(()=>{navigate('/result')},30000)
  return (
    <div>
      <div>
      問題はこれで終わりです。
      みなさん、提出してください
      </div>
    </div>
  )
}

export default ScreanIdle