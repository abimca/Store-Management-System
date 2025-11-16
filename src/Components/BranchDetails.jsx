import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import '../CSS/BranchDetails.CSS'

// 4

const BranchDetails = () => {

let param = useParams()
  
let id=param.id

let navigate = useNavigate()

let[store,setStore]=useState({})

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


let getDetails = async()=>{

  setStore((await axios.get(`http://localhost:8080/getById?id=${id}`)).data)
 
}

useEffect(()=>{
  getDetails()
},[])


  let previous =()=>{
    navigate(-1)
  }

  let addProduct =()=>{
    validate()
    navigate(`/addProduct/${id}`)
  }

  let fetchProduct =()=>{
    validate()
    navigate(`/fetchProductDetails/${id}`)
  }

   let removeProduct= ()=>{
    validate()
    navigate(`/removeProductDetails/${id}`)
  }

  let quantiyLess =()=>{
    validate()
    navigate(`/fetchQuantityless/${id}`)
  }
  
  return (
    <>
    <Navbar/>

  <div className="main">
    <div className="outerdetails">
          <div className="strname">
            <h2>{store.storeLocation} Branch</h2>
          </div>

      <div className="strdetails">
        <div className="strleft">
            <p id='heading'>Barnch Email Id </p>
            <p id='heading'>Barnch Phone No </p>
            <p id='heading'>Manager Name </p>
            <p id='heading'>Manager Phone No </p>
        </div>
        <div className="strright">
            <p>: {store.storeEmail} </p>
            <p>: {store.storePhoneNo}</p>
            <p>: {store.managerName}</p>
            <p>: {store.managerPhoneNo}</p>
        </div>
      </div>
       
    </div>

    <div className="innerdetails">
        <button id='addb1' onClick={addProduct}>Add Product</button>
        <button id='removeb1' onClick={removeProduct}>Remove Product</button>
        <button id ='fetchb1' onClick={fetchProduct}>Fetch Product</button>
        <button id='lessQuantity'onClick={quantiyLess} >Fetch Product Less Quantity</button>
    </div>
    
    <button id='b1' onClick={previous}>Back</button>  

  </div>

     
    </>
  )
}

export default BranchDetails