import React, { use, useEffect, useState } from 'react'
import '../CSS/AddProduct.CSS'
import Navbar from './Navbar'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
// 5
const AddProduct = () => {

let navigate =useNavigate()

let param = useParams()

let id = param.id

let[store,setStore] = useState({})

let [prodName,setProdName] = useState("")
let[prodType,setProdType] = useState("")
let[prodBrand,setProdBrand] = useState("")
let[prodColor,setProdColor] = useState("")
let[prodPrice,setProdPrice] = useState("")
let[prodQty,setProdQty] = useState("")

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

    useEffect(()=>{

let getStoreName = async()=>{

try {
    let result = (await axios.get(`http://localhost:8080/getById?id=${id}`)).data

    setStore(result)
} catch (error) {
    console.log(error);
    
}
}


getStoreName()

    },[])

    let handleAddProduct =async(e)=>{
        e.preventDefault()
        validate()
        

        let addProducts = {
            productName : prodName,
            productType : prodType,
            productBrand : prodBrand,
            productColor : prodColor,
            productPrice : prodPrice,
            productQuantity : prodQty
        }

        try {
            let addProd = (await axios.post(`http://localhost:8080/addProducts?sid=${id}`,addProducts)).data
            alert("Product Added Successfully")
        } catch (error) {
            console.log(error);
        }

        setProdName("")
        setProdType("")
        setProdBrand("")
        setProdColor("")
        setProdPrice("")
        setProdQty("")
    }


    let backBranch =()=>{
        navigate(-1)
    }

  return (
    <>
    <Navbar/>

    <div className="outerProduct">
            <h2>Welcome to {store.storeLocation} branch</h2>
            <h3>Add Products</h3>
        <div className='innerProduct'>
            
        <div className="addProduct">
        <form action="" onSubmit={handleAddProduct}>

            {/* <label htmlFor="">Product Name </label> */}
            <input type="text" name="" id="" placeholder='Enter Product Name' value={prodName} onChange={(e)=>{setProdName(e.target.value)}} required/>

            {/* <label htmlFor="">Product Type </label> */}
            <input type="text" name="" id="" placeholder='Enter Product Type' value={prodType} onChange={(e)=>{setProdType(e.target.value)}} required/>

            {/* <label htmlFor="">Product Brand </label> */}
            <input type="text" name="" id="" placeholder='Enter Product Brand' value={prodBrand} onChange={(e)=>{setProdBrand(e.target.value)}}  required/>

            {/* <label htmlFor="">Product Color </label> */}
            <input type="text" name="" id="" placeholder='Enter Product Color' value={prodColor} onChange={(e)=>{setProdColor(e.target.value)}}  required/>

            {/* <label htmlFor="">Product Price </label> */}
            <input type="text" name="" id="" placeholder='Enter Product Price' value={prodPrice} onChange={(e)=>{setProdPrice(e.target.value)}}  required/>

            {/* <label htmlFor="">Product Quantity </label> */}
            <input type="text" name="" id="" placeholder='Enter Product Quantity' value={prodQty} onChange={(e)=>{setProdQty(e.target.value)}}  required/>

            <button id='add' type="submit">Add Product</button>

        </form>
        
    </div>

        </div>
    
    <button id='b1' onClick={backBranch}>Back</button>
    </div>
       
    </>
  )
}

export default AddProduct