import React from 'react'
//Challengerの結果
function ChallengerResult() {
  console.log(JSON.parse(localStorage.getItem("quiz_my_quiz")))
  return (
    <div>結果発表までしばらくお待ちください</div>
  )
}

export default ChallengerResult