import React from 'react'
import { useLocation } from 'react-router-dom';
//Challengerがクイズに答える
//４択表示
//realtime database からデータ受け取り
//少しお待ちください
function ChallengerQuiz() {
  const location = useLocation();
  console.log(location.state.roomID)
  return (
    <div>ChallengerQuiz</div>
  )
}

export default ChallengerQuiz