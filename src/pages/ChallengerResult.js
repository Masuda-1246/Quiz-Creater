import React from 'react'
//Challengerの結果
function ChallengerResult() {
  return (
    <div style={{backgroundColor: "#D9D9D9", height:window.innerHeight}}>
      <div style={{display:"flex"}}>
        <div style={{backgroundColor:"#FA2A2A", height:"10px", width:'50%'}}/>
        <div style={{backgroundColor:"#01426C", height:"10px", width:'50%'}}/>
      </div>
      <div style={{fontWeight: "bold", minHeight:"100vh"}}>
      <div style={{display:"flex", minHeight:"100vh", flexDirection:"column", justifyContent:"center", alignItems: "center"}}>
        結果発表までしばらくお待ち下さい
        <div style={{display:"flex"}}>
          <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#FA2A2A"}}></div>
          <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#01426C"}}></div>
          <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#FFB800"}}></div>
          <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#FF8000"}}></div>
        </div>
      </div>
    </div>
      <div style={{display:"flex", position:"absolute", bottom:0, width:"100%"}}>
        <div style={{backgroundColor:"#FF8000", height:"10px", width:'50%'}}/>
        <div style={{backgroundColor:"#FFB800", height:"10px", width:'50%'}}/>
      </div>
    </div>
  )
}

export default ChallengerResult