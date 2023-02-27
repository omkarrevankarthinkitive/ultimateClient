
import { Box,Button } from '@mui/material'
import {useNavigate,Link} from "react-router-dom"
import AddAppointment from '../../Pages/AddAppointment'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'

// import "./RightDocDeatils.css"


function RightDocDetals() {
    const navigate=useNavigate()
    const [allData,setDataAll]=useState([])
    const location=useParams()
  const newLocation=  location.id

 

    let justData={
        "_id":newLocation
    }
    useEffect(()=>{
        getdocByID(justData)
    },[])

let statusCode

let token=localStorage.getItem("token")
    const getdocByID = async (data) => {
        await fetch(`http://localhost:4222/api/doctor/doctordetail/doctorsPage/${localStorage.getItem("id")}`, {
          method: "POST",
          
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
        })
          .then((res) => {
            statusCode=res.status
            return res.json()})
          
          .then((res) => {
        
            if (statusCode === 400) {
             console.log(res+"wwwwwwwwww")
            }
            if (statusCode === 200) {
              console.log("data: ", res);
              setDataAll(res)
    
              
              
              
            }
          });
      };

    const nevigate=useNavigate()

    function bookmyaptFunc(){
        nevigate("/api/apt")
    }
    const params=useParams()

    if(params.id){
        localStorage.setItem("id",params.id)
    }

  return (
    <div className="mainDivRightDoc" >
         <section className="section about-section forBack" id="about" >
            <div className="container">
                <div className="row align-items-center flex-row-reverse">
                    <div className="col-lg-6">
                        <div className="about-text go-to">
                            <h3 className="dark-color">{allData?.doctorName}</h3>

                            {
                               allData && allData.qualification && allData.qualification.map((item)=>{
                                return (
                                    <h6 className="theme-color lead">{item}</h6>
                                )
                                })
                            }
                            
                            <p>{allData?.aboutMyself}</p>
                            <div className="row about-list">
                                <div className="col-md-6">
                                <div className="media">
                                        <label>Clinic</label>
                                        <p>{allData?.clinicName}</p>
                                    </div>
                                    <div className="media">
                                        <label>Gender</label>
                                        <p>{allData?.Gender}</p>
                                    </div>
                                    
                                    <div className="media">
                                        <label>Address</label>
                                        <p>California, USA</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="media">
                                        <label>E-mail</label>
                                        <p>info@domain.com</p>
                                    </div>
                                    <div className="media">
                                        <label>phone</label>
                                        <p>{allData?.phoneNumber}</p>
                                    </div>
                                    <div className="media">
                                        <label>Skype</label>
                                        <p>skype.0404</p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-avatar">
                            <img src={allData?.img} className="rightDocImg"  title="" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="counter ">
                    <div className="row">
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="500" data-speed="500">500</h6>
                                <p className="m-0px font-w-600">Happy Clients</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="150" data-speed="150">150</h6>
                                <p className="m-0px font-w-600">operations Completed</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="850" data-speed="850">850</h6>
                                <p className="m-0px font-w-600">Telephonic Treatment</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="count-data text-center">
                                <h6 className="count h2" data-to="190" data-speed="190">190</h6>
                                <p className="m-0px font-w-600">Home Treatment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      
    </div>
  )
}

export default RightDocDetals