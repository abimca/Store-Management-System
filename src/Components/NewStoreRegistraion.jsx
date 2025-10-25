import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../CSS/NewStoreRegister.CSS'
import register_img from '../assets/Register.png'

// 3
const NewStoreRegistraion = () => {

  let[storeEmail,setStoreEmail]=useState("")
  let[storeLoc,setStoreLoc]=useState("")
  let[storePhone,setStorePhone]=useState("")
  let[managerName,setManagerName]=useState("")
  let[managerPhone,setManagerPhone]=useState("")



let validate =async()=>{
  try {
    const res1 = await axios.get('http://localhost:8080/getSession', { withCredentials: true });


    if(res1.data==="No Session Found"){
          alert("Login Required !")
      navigate("/")
    }
  } catch (error) {
    
  }
}
validate()



  let handleSubmit=async(e)=>{
    e.preventDefault()
validate()
    let payload={
              storeEmail : storeEmail,
              storeLocation : storeLoc,
              storePhoneNo : storePhone,
              managerName : managerName,
              managerPhoneNo : managerPhone
    }

     try{
            let response=(await axios.post(`http://localhost:8080/save`,payload)).data
            alert("New Store registerd successfully")
        }
        catch(error){
           console.log(error)
        }

    setStoreEmail("")
    setStorePhone("")
    setStoreLoc("")
    setManagerName("")
    setManagerPhone("")


  }

  let navigate = useNavigate()
  let previous =()=>{
    navigate(-1)
  }




  return (
    <>
    <Navbar/>

    <div className="outer">

      <div className="left">
        <h1>New Store Registration</h1>
        <img src={register_img} alt="" />
      </div>

      <div className="right">
        <div className="storeRegister">

          <form action="" onSubmit={handleSubmit}>

            {/* <label htmlFor="">Store Email Id</label> */}
            <input type="email" name="" id="storeEmailId" placeholder='Enter store email id' required value={storeEmail} onChange={(e)=>setStoreEmail(e.target.value)} />

            {/* <label htmlFor="">Store Location</label> */}
            <input type="text" name="" id="storeLoc" placeholder='Enter store location'required value={storeLoc} onChange={(e)=>setStoreLoc(e.target.value)} />

            {/* <label htmlFor="">Store Phone No</label> */}
            <input type="" name="" id="storePhone" placeholder='Enter store phone number'required value={storePhone} onChange={(e)=> setStorePhone(e.target.value)} />

            {/* <label htmlFor="">Manager Name</label> */}
            <input type="text" name="" id="managerName" placeholder='Enter Manager name'required value={managerName} onChange={(e)=>setManagerName(e.target.value)} />

            {/* <label htmlFor="">Manager Phone No</label> */}
            <input type="" name="" id="managerPhone" placeholder='Enter manager number'required value={managerPhone} onChange={(e)=>setManagerPhone(e.target.value)} />

            <button id='b1' type='submit' >Register</button>
          </form>
    
        </div>
          <button id='back' onClick={previous}>Back</button>
      </div>
    </div>
    
    </>
  )
}

export default NewStoreRegistraion