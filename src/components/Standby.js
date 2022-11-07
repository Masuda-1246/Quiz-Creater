import React from 'react'
//待機
function Standby(props) {
  return (
    <div style={{fontWeight: "bold", minHeight:"100vh"}}>
      <div style={{display:"flex", minHeight:"100vh", flexDirection:"column", justifyContent:"center", alignItems: "center"}}>
        {props.text}
        <div style={{display:"flex"}}>
          <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#FA2A2A"}}></div>
          <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#01426C"}}></div>
          <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#FFB800"}}></div>
          <div style={{margin:"5px", width: "10px",fontSize:"1px", height: "10px", borderRadius: "50%", backgroundColor: "#FF8000"}}></div>
        </div>
      </div>
    </div>
  )
}

export default Standby;