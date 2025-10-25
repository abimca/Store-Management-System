import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import '../CSS/FetchQuantityLess.CSS'

const FetchQuantityless = () => {

   let param = useParams();

   let id = param.id 
  const [store, setStore] = useState({});
  const [lessprod, lessSetProd] = useState([]);
  let navigate  = useNavigate()
    
  const previous = () => navigate(-1);

  let[ProductForName,setProductForName] = useState([])
  let [ProductForType,setProductForType]= useState([])
  let[ProductForBrand,setProductForBrand] = useState([])



   let validate =async()=>{
        try {
             const res1 = await axios.get('http://localhost:8080/getSession', { withCredentials: true });


        if(res1.data==="No Session Found"){
             alert("Login Required !")
             navigate("/")
         }
     } catch (error) {
            console.log(error);
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
    fetchProductsQuantityLess()

  }, []);

  
  let fetchdata=async()=>{
     const res1 = (await axios.get(`http://localhost:8080/fetchAllProductsByStoreIdforNameQuantityLess?storeId=${id}`)).data
        setProductForName(res1)
     const res2 = (await axios.get(`http://localhost:8080/fetchAllProductsByStoreIdforTypeQuantityLess?storeId=${id}`)).data
        setProductForType(res2)
      const res3 = (await axios.get(`http://localhost:8080/fetchAllProductsByStoreIdforBrandQuantityLess?storeId=${id}`)).data
        setProductForBrand(res3)   

  }

 let [productsByName,setProductsByName] = useState([])
 let [productsByType,setProductsByType] = useState([])
 let [productsByBrand,setProductsByBrand] = useState([])
 let [selectedProductName,setselectedProductName]=useState("")
 let [selectedProductType,setselectedProductType]=useState("")
 let [selectedProductBrand,setselectedProductBrand]=useState("")


  let[defaultState,setdefaultState] = useState(true)
  let[nameState,setNameState] = useState(false)
  let[typeState,setTypeState] = useState(false)
  let[brandState,setBrandState] = useState(false)
let fetchByName =async()=>{
  validate()

    // console.log(selectedProductName);
    
    setNameState(true)
   
    setdefaultState(false)
   
    
try {
  const nameRes = (await axios.get(`http://localhost:8080/fetchAllProductsByNameforQuantity/${selectedProductName}/${id}`)).data
       setProductsByName(nameRes)
    
        
} catch (error) {
  console.log(error);
  
}
  }

 let fetchByType =async()=>{
  validate()


    setTypeState(true)
    setNameState(false)
   
    setdefaultState(false)
   
    
try {
  const typeRes = (await axios.get(`http://localhost:8080/fetchAllProductsByTypeforQuantity/${selectedProductType}/${id}`)).data
       setProductsByType(typeRes)
    
        
} catch (error) {
  console.log(error);
  
}
  } 

let fetchByBrand =async()=>{
  validate()

    setBrandState(true)
    setTypeState(false)
    setNameState(false)
   
    setdefaultState(false)
   
    
try {
  const brandRes = (await axios.get(`http://localhost:8080/fetchAllProductsByBrandforQuantity/${selectedProductBrand}/${id}`)).data
       setProductsByBrand(brandRes)
    
        
} catch (error) {
  console.log(error);
  
}
  }   



  let fetchProductsQuantityLess = async()=>{
 
        const prodRes = await axios.get(`http://localhost:8080/fetchAllProductsByStoreIdforQuantityLess?storeId=${id}`);
       
        lessSetProd(prodRes.data);
    }

 let reset = ()=>{
    setselectedProductBrand("")
    setselectedProductType("")
    setselectedProductName("")

    setTypeState(false)
    setdefaultState(true)
    setNameState(false)
    setBrandState(false)
  }





  return (
    <>
    <Navbar/>

    <div className="outerProducts">
      <div className="products2">
        <h2>Welcome to {store.storeLocation || 'Store'} Branch</h2>
      </div>
     
<div className="outer-filter" onMouseEnter={fetchdata}>

    <div className="filter-search">
      <div className="label"><p>
          Search by Product Name  </p></div>
          <div className="values"><select value={selectedProductName} onChange={(e)=>{setselectedProductName(e.target.value)}} >
            <option value="">Choose Product Name</option>
            {ProductForName.length > 0 &&
              ProductForName.map((ele,ind) => (
                <option key={ind} value={ele}>
                  {ele}
                </option>
              ))
            }
            
          </select></div>
        <div className="button">  <button id="search" onClick={fetchByName}>Search</button></div>
    </div>

    <div className="filter-search">
      <div className="label"><p>
          Search by Product Type  </p></div>
          <div className="values"><select value={selectedProductType} onChange={(e)=>{setselectedProductType(e.target.value)}} >
            <option value="">Choose Product Type</option>
            {ProductForType.length > 0 &&
              ProductForType.map((ele,ind) => (
                <option key={ind} value={ele}>
                  {ele}
                </option>
              ))
            }
            
          </select></div>
        <div className="button">  <button id="search" onClick={fetchByType}>Search</button></div>
    </div>


    <div className="filter-search">
      <div className="label"><p>
          Search by Product Brand  </p></div>
          <div className="values"><select value={selectedProductBrand} onChange={(e)=>{setselectedProductBrand(e.target.value)}} >
            <option value="">Choose Product Brand</option>
            {ProductForBrand.length > 0 &&
              ProductForBrand.map((ele,ind) => (
                <option key={ind} value={ele}>
                  {ele}
                </option>
              ))
            }
            
          </select></div>
        <div className="button">  <button id="search" onClick={fetchByBrand}>Search</button></div>
    </div>
     <div className="buttons">
        <button id='b1' onClick={reset}>Reset</button> 
        <button id='b1' onClick={previous}>Back</button> 
      </div>

</div>


      <div className="totalprod">
        {
           defaultState == true ? <h1>Total Products : {lessprod.length <=9 ? "0" + lessprod.length : lessprod.length}</h1> : nameState == true ? <h1>Total Products : {productsByName.length <=9 ? "0" + productsByName.length : productsByName.length}</h1> : typeState == true ? <h1>Total Products : {productsByType.length <=9 ? "0" +productsByType.length : productsByType.length}</h1> : brandState && <h1>Total Products : {productsByBrand.length <=9 ? "0" + productsByBrand.length : productsByBrand.length}</h1> 

        }
       </div>

      <div className="prod-outer1">
        {  defaultState == true ? (lessprod.length > 0 ? (lessprod.map((product) => (
            <div key={product.productId} className='prod-inner1'>

              <h2>Product Name : {product.productName}</h2>
              <h2>Product Brand : {product.productBrand}</h2>
              <h2>Product Type : {product.productType}</h2>
              <h2>Product Color : {product.productColor}</h2>
              <h2>Product Price : {product.productPrice}</h2>
              <h2 id='qty'>Product Quantity : {product.productQuantity <=9 ? "0" +product.productQuantity : product.productQuantity}</h2>
             
            </div>
          ))) : ( <h2>No products to display ...</h2> ) ) : nameState == true ?(productsByName.length > 0 ? (productsByName.map((product) => (
            <div key={product.productId} className='prod-inner1'>

              <h2>Product Name : {product.productName}</h2>
              <h2>Product Brand : {product.productBrand}</h2>
              <h2>Product Type : {product.productType}</h2>
              <h2>Product Color : {product.productColor}</h2>
              <h2>Product Price : {product.productPrice}</h2>
              <h2 id='qty'>Product Quantity : {product.productQuantity <=9 ? "0" +product.productQuantity : product.productQuantity}</h2>
             
            </div>
          ))) : ( <h2>Choose the Product Name Before Search...</h2> ) ) : typeState == true ?(productsByType.length > 0 ? (productsByType.map((product) => (
            <div key={product.productId} className='prod-inner1'>

              <h2>Product Name : {product.productName}</h2>
              <h2>Product Brand : {product.productBrand}</h2>
              <h2>Product Type : {product.productType}</h2>
              <h2>Product Color : {product.productColor}</h2>
              <h2>Product Price : {product.productPrice}</h2>
              <h2 id='qty'>Product Quantity : {product.productQuantity <=9 ? "0" +product.productQuantity : product.productQuantity}</h2>
             
            </div>
          ))) : ( <h2>Choose the Product Type Before Search...</h2> ) ) : brandState == true &&(productsByBrand.length > 0 ? (productsByBrand.map((product) => (
            <div key={product.productId} className='prod-inner1'>

              <h2>Product Name : {product.productName}</h2>
              <h2>Product Brand : {product.productBrand}</h2>
              <h2>Product Type : {product.productType}</h2>
              <h2>Product Color : {product.productColor}</h2>
              <h2>Product Price : {product.productPrice}</h2>
              <h2 id='qty'>Product Quantity : {product.productQuantity <=9 ? "0" +product.productQuantity : product.productQuantity}</h2>
             
            </div>
          ))) : ( <h2>Choose the Product Brand Before Search...</h2> ) ) 
          
          
    
        }
      </div>

    </div>

    
    </>
  )
}

export default FetchQuantityless