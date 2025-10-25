import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import '../CSS/RemoveProducts.CSS'

const RemoveProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [store, setStore] = useState({});
  const [prod, setProd] = useState([]);

  const previous = () => navigate(-1);


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
    let fetchStore = async () => {
      try {
      
        // Fetch store info
        const storeRes = await axios.get(`http://localhost:8080/getById?id=${id}`);
        setStore(storeRes.data);

        
      } catch (err) {
        console.error(err);
        setError('Failed to load store or products');
      } 
    };

    fetchStore();
    fetchProducts()

  }, []);

  let fetchProducts = async()=>{
 
        const prodRes = await axios.get(`http://localhost:8080/fetchAllProductsByStoreId?storeId=${id}`);

        setProd(prodRes.data);
   }
 
  let removeProducts= async(pid)=>{
    validate()
   
      const confirmed = window.confirm(" Do you want to remove this product?");
      if(confirmed) {
        try {
            let res = await axios.delete(`http://localhost:8080/deleteProduct?pid=${pid}`)
            alert("Product deleted successfully")
        } catch (error) {
          console.log("Error deleting product",error);
      }
    }else{
      alert("Product Deletion Cancelled")
    }
      fetchProducts()
  }
 

  return (
    <>

    <Navbar/>
    <div className="outerProd2">
      <div className="products1">
        <h2>Welcome to {store.storeLocation || 'Store'} Branch</h2>
        <button id='back1' onClick={previous}>Back</button>
      </div>

      <div className="prod-outer">
        { prod.length > 0 ? (prod.map((product) => (
            <div key={product.productId} className='prod-inner'>

              <h2>Product Name : {product.productName}</h2>
              <h2>Product Brand : {product.productBrand}</h2>
              <h2>Product Type : {product.productType}</h2>
              <h2>Product Color : {product.productColor}</h2>
              <h2>Product Price : {product.productPrice}</h2>
              <h2>Product Quantity : {product.productQuantity}</h2>
             
            <button id='remove' onClick={()=>removeProducts(product.productId)} >Remove</button>
            </div>
          ))) : ( <h1>No products to display ...</h1> )
        }
      </div>

    </div>

    
    
    </>
  )
}

export default RemoveProduct