import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import '../CSS/UpdateProduct.CSS'
// 8
const UpdateProduct = () => {

let navigate = useNavigate()

let param = useParams()

let pid = param.pid
let sid = param.sid

const [prod, setProd] = useState({});
const [store, setStore] = useState({});

let [price,setPrice] = useState("")
let [quantity,setQuantity] = useState("")

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
  

  useEffect(() => {
   

    fetchProducts();
  }, []);

 const fetchProducts = async () => {

      try {
        const prodRes = await axios.get(`http://localhost:8080/fetchById?id=${pid}`);
        const storeRes = await axios.get(`http://localhost:8080/getById?id=${sid}`);

        setProd(prodRes.data);
        setStore(storeRes.data)
       

      } catch (err) {
       console.log(err);
      } 
    };



  let newProduct ={


        productName : prod.productName,
        productBrand : prod.productBrand,
        productType : prod.productType,
        productColor :prod.productColor,
        productPrice : price,
        productQuantity : quantity
      
  }

  let updateNewProduct =async(e)=>{

    e.preventDefault()
    validate()
    try {
      await axios.put(`http://localhost:8080/updateProduct?id=${pid}`,newProduct)

      alert(`New Product Details Updated`)
      setPrice("")
      setQuantity("")
      fetchProducts()
    } catch (error) {
     console.log(error);
      
    }
  }




  let previous=()=>{
    navigate(-1)
  }



  return (
    <>
    
    <Navbar/>


    <div className="outerProd1">

        <h1>{store.storeLocation} Branch</h1>
    <div className="oldProduct">
            <div  className='prod-left'>
            <h2>Product Name :  </h2>
            <h2>Product Brand :  </h2>
            <h2>Product Type : </h2>
            <h2>Product Color :  </h2>
            <h2>Product Price : </h2>
            <h2>Product Quantity : </h2>
          </div>

          <div className="prod-right">
            <h2>{prod.productName}</h2>
            <h2>{prod.productBrand}</h2>
            <h2>{prod.productType}</h2>
            <h2>{prod.productColor}</h2>
            <h2>{prod.productPrice}</h2>
            <h2>{prod.productQuantity <=9 ? "0"+prod.productQuantity : prod.productQuantity}</h2>

          </div>
          
    </div>
    
    <div className="updateProduct">
        <h3>Update Product</h3>
        <div className="update">

          <form action="" onSubmit={updateNewProduct}>
              <div className='update-details'>
                <div className='update-label'><label htmlFor="">Price </label></div>
              <input type="text" name="" id="" placeholder={prod.productPrice} value={price} onChange={(e)=>setPrice(e.target.value)} required/> 
              </div>
             <div className='update-details'> 
             <div className='update-label'> <label htmlFor="">Quantity </label></div>
              <input type="text" name="" id="" placeholder={prod.productQuantity <=9 ? "0"+prod.productQuantity : prod.productQuantity} value={quantity} onChange={(e)=>setQuantity(e.target.value)} required/>
                </div>
              <button type='submit' id='update2'>Update</button>

          </form>
        </div>
    </div>
    <button id='backb5' onClick={previous}>Back</button>
   </div>




    
    
    
    
    
    
    </>
  )
}

export default UpdateProduct