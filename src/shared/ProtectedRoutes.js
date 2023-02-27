import React from "react";
import {  Navigate, Outlet } from "react-router-dom";
  
function calling(){
  let protectedData=
  {
    Authorization:localStorage.getItem("token")
  }
  getToken(protectedData)
}

let newToken=localStorage.getItem("token")


console.log(newToken,"thisisis")


let finalVal=false
async function getToken(data){
  await fetch("http://localhost:4222/api/users/verify",{
  method:"POST",
 
  header:{"Content-Type": "application/json",
  "Authorization":"Beaer Bearer "+newToken


},
}
).then((res) => res.json())
.then((res)=>{
  if(res.val==true){
    finalVal=true
  }
})
}
calling()



function ProtectedRoutes() {
  

  return newToken ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
