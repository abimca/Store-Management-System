import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/FetchProductDetails.CSS'

const ProductDetails = () => {
const { id } = useParams();
const navigate = useNavigate();

const [store, setStore] = useState({});
const [prod, setProd] = useState([]);

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
    
  }
}
validate()  

  useEffect(() => {
    const fetchStoreAndProducts = async () => {
      try {
      
     
        const storeRes = await axios.get(`http://localhost:8080/getById?id=${id}`);
        setStore(storeRes.data);

        const prodRes = await axios.get(`http://localhost:8080/fetchAllProductsByStoreId?storeId=${id}`);
     
        setProd(prodRes.data);



      } catch (err) {
        console.error(err);
        setError('Failed to load store or products');
      } 
    };

    fetchStoreAndProducts();
    
   
  }, []);



  let update = (pid)=>{
    validate()
    navigate(`/updateProduct/${pid}/${id}`)
  }


  let fetchdata=async()=>{
     const res1 = (await axios.get(`http://localhost:8080/fetchAllProductsByStoreIdforName?storeId=${id}`)).data
        setProductForName(res1)

     const res2 = (await axios.get(`http://localhost:8080/fetchAllProductsByStoreIdforType?storeId=${id}`)).data
        setProductForType(res2)   
     
     const res3 = (await axios.get(`http://localhost:8080/fetchAllProductsByStoreIdforBrand?storeId=${id}`)).data
        setProductForBrand(res3)      

  }

let [productsByName,setProductsByName] = useState([])
let [productsByType,setProductsByType] = useState([])
let [productsByBrand,setProductsByBrand] = useState([])
let [selectedProductName,setselectedProductName]=useState("")
let [selectedProductType,setselectedProductType]=useState("")
let [selectedProductBrand,setselectedProductBrand]=useState("")


let[defaultState,setdefaultState] = useState(true)
let[nameState,setNameState] = useState(true)
let[typeState,setTypeState] = useState(false)
let[brandState,setBrandState] = useState(true)


let fetchByName =async()=>{
  validate()

    // console.log(selectedProductName);
    
    setNameState(true)
   
    setdefaultState(false)
    setTypeState(false)
    setBrandState(false)
    
try {
  const nameRes = (await axios.get(`http://localhost:8080/fetchByName/${selectedProductName}/${id}`)).data
       setProductsByName(nameRes)
        
} catch (error) {
  console.log(error);
  
}
  }

  let fetchByType =async()=>{
    validate()

    setTypeState(true)
    setdefaultState(false)
    setNameState(false)
    setBrandState(false)
    
  

try {
  const typeRes = (await axios.get(`http://localhost:8080/fetchByType/${selectedProductType}/${id}`)).data
       setProductsByType(typeRes)
        
} catch (error) {
  console.log(error);
  
}


 }
  let fetchByBrand =async()=>{
    validate()

    setBrandState(true)
    setdefaultState(false)
    setTypeState(false)
    setNameState(false)
    

try {
  const brandRes = (await axios.get(`http://localhost:8080/fetchByBrand/${selectedProductBrand}/${id}`)).data
       setProductsByBrand(brandRes)
        
} catch (error) {
  console.log(error);
  
}


  }
let[filter,setFilter]=useState("")


  let reset = ()=>{
    setselectedProductBrand("")
    setselectedProductType("")
    setselectedProductName("")
    setFilter("")
    setTypeState(false)
    setdefaultState(true)
    setNameState(false)
    setBrandState(false)
  }

  

  let[filterProduct,setFilterProduct] = useState([])

  let[filterProductState,setFilterProductState]=useState(false)

  useEffect(()=>{
  filterProducts()
  },[filter])

  let filterProducts=async()=>{

      try {
        if(selectedProductType=="" && filter!=""){
                alert("Select Product Type Before Apply the Filters")
                setselectedProductBrand("")
                setselectedProductType("")
                setselectedProductName("")
                setFilter("")
                setdefaultState(true)

              }
        if(selectedProductType!="" && filter !=""){
            if(filter=="ATOZ"){
              let filter1 = (await axios.get(`http://localhost:8080/fetchAllProductsByStoreIdforTypeAsc?storeId=${id}&productType=${selectedProductType}`)).data
              setFilterProduct(filter1)
              setdefaultState(false)
              setNameState(false)
              setTypeState(false)
              setBrandState(false)
              setFilterProductState(true)    
        }
        else if(filter == "ZTOA"){
              let filter2 =(await axios.get(`http://localhost:8080/fetchAllProductsByStoreIdforTypeDesc?storeId=${id}&productType=${selectedProductType}`)).data 
              setFilterProduct(filter2)
              setdefaultState(false)
              setNameState(false)
              setTypeState(false)
              setBrandState(false)
              setFilterProductState(true)
        }
        else if(filter == "LOWTOHIGH"){
              let filter3 = (await axios.get(`http://localhost:8080/fetchAllProductsByStoreIdforQuantityAsc?storeId=${id}&productType=${selectedProductType}`)).data 
              setFilterProduct(filter3)
              setdefaultState(false)
              setNameState(false)
              setTypeState(false)
              setBrandState(false)
              setFilterProductState(true)
        }
        else if(filter == "HIGHTOLOW"){
              let filter4 = (await axios.get(`http://localhost:8080/fetchAllProductsByStoreIdforQuantityDesc?storeId=${id}&productType=${selectedProductType}`)).data 
              setFilterProduct(filter4)
              setdefaultState(false)
              setNameState(false)
              setTypeState(false)
              setBrandState(false)
              setFilterProductState(true)
        }


        }
      } catch (error) {
        console.log(error);
        
      }

}





  return (
    <>
      <Navbar />

    <div className="alldetails">

      <div className="products">
        <h2>{store.storeLocation || 'Store'} Branch</h2>
      </div>

      <div className="filters" onMouseEnter={fetchdata}>

      <div className='product-search'>
             <div className="label"> <p>Search by Product Type </p></div>
               <div className="values"> <select value={selectedProductType} onChange={(e)=>{ setselectedProductBrand(""); setselectedProductName("");setselectedProductType( e.target.value)}}>
                  <option  value="">Choose Product Type</option>
                  {
                    ProductForType.length > 0 && 
                      ProductForType.map((ele,ind)=>(
                        <option key={ind} value={ele}>
                          {ele}
                        </option>
                      ))
                  }
                    </select>
                </div> 
                  <div className="button">  <button onClick={fetchByType} id='search'>Search</button> </div>         
      </div>

      <div className='product-search' >
        <div className="label"><p>
          Search by Product Name  </p></div>
          <div className="values"><select value={selectedProductName} onChange={(e)=>{setselectedProductType("");setselectedProductBrand(""); setselectedProductName(e.target.value)}}>
            <option value="">Choose Product Name</option>
            {ProductForName.length > 0 &&
              ProductForName.map((ele,ind) => (
                <option key={ind} value={ele}>
                  {ele}
                </option>
              ))
            }
          </select></div>
        <div className="button">  <button onClick={fetchByName} id="search">Search</button></div>
      
        </div>

      <div className='product-search'>
              <div className="label"><p>Search by Product Brand </p></div> 
               <div className="values"><select value={selectedProductBrand} onChange={(e)=>{setselectedProductName("");setselectedProductType(""); setselectedProductBrand(e.target.value)}}>
                  <option value="">Choose Product Brand</option>
                  {
                    ProductForBrand.length > 0 && 
                      ProductForBrand.map((ele,ind)=>(
                        <option key={ind} value={ele}>
                          {ele}
                        </option>
                      ))

                  }
                  </select></div>  
                  <div className="button">  <button onClick={fetchByBrand} id='search'>Search</button></div>

      </div>
           <div className="back-button">  
            <button id='b1' onClick={reset}>Reset</button> 
            <button id='b1' onClick={previous}>Back</button> 
           </div>

          
              <div className='type-filter'>
              <select name="" id="" value={filter} onChange={(e)=>{setFilter(e.target.value)}}>
                <option value="">Filters</option>
                <option value="ATOZ">Name: A to Z</option>
                <option value="ZTOA">Name: Z to A</option>
                <option value="LOWTOHIGH">Quantity: Low to High</option>
                <option value="HIGHTOLOW">Quantity: High to Low</option>
              </select>
              </div>
           
          </div>

            <div className='product-count' >

                    {
                      defaultState ==true ? <h1>Total Products : {prod.length <=9 ? "0" + prod.length : prod.length}</h1> : typeState == true ? <h1>Total Products : {productsByType.length <=9 ? "0" +productsByType.length : productsByType.length}</h1> : nameState == true ? <h1>Total Products : {productsByName.length <=9 ? "0" + productsByName.length : productsByName.length}</h1> : brandState ? <h1>Total Products : {productsByBrand.length <=9 ? "0" + productsByBrand.length : productsByBrand.length}</h1> : filterProductState == true && <h1>Total Products : {filterProduct.length <=9 ? "0" + filterProduct.length: filterProduct.length}</h1>
                    }


            </div>
      <div className="prod-outer">



<div className="prod-inner-1">
  
        {
          defaultState == true ? ( prod.length > 0 ? (prod.map((product) => (
            <div key={product.productId} className='prod-inner'>

              <h2>Product Name : {product.productName}</h2>
              <h2>Product Brand : {product.productBrand}</h2>
              <h2>Product Type : {product.productType}</h2>
              <h2>Product Color : {product.productColor}</h2>
              <h2>Product Price : {product.productPrice}</h2>
              <h2>Product Quantity : {product.productQuantity <=9 ? "0" +product.productQuantity : product.productQuantity }</h2>
             
            <button id='update' onClick={()=>update(product.productId)} >Update</button>
            </div>
          ))) : (<h2>No Products Found for This Branch</h2> )) : nameState == true ?  ( productsByName.length > 0 ? (productsByName.map((product) => (
            <div key={product.productId} className='prod-inner'>

              <h2 id='h1'>Product Name : {product.productName}</h2>
              <h2>Product Brand : {product.productBrand}</h2>
              <h2>Product Type : {product.productType}</h2>
              <h2>Product Color : {product.productColor}</h2>
              <h2>Product Price : {product.productPrice}</h2>
              <h2>Product Quantity : {product.productQuantity <=9 ? "0" +product.productQuantity : product.productQuantity }</h2>
             
            <button id='update' onClick={()=>update(product.productId)} >Update</button>
            </div>
          ))) : (<h2>Choose Product Name before Search</h2> )) : typeState == true ? ( productsByType.length > 0 ? (productsByType.map((product) => (
            <div key={product.productId} className='prod-inner'>

             <h2 id='h1'>Product Type : {product.productType}</h2>
              <h2>Product Name : {product.productName}</h2>
              <h2>Product Brand : {product.productBrand}</h2>
              <h2>Product Color : {product.productColor}</h2>
              <h2>Product Price : {product.productPrice}</h2>
              <h2>Product Quantity : {product.productQuantity <=9 ? "0" +product.productQuantity : product.productQuantity }</h2>
             
            <button id='update' onClick={()=>update(product.productId)} >Update</button>
            </div>
          ))) : (<h2>Choose Product Type before Search</h2> )) : brandState == true ?  ( productsByBrand.length > 0 ? (productsByBrand.map((product) => (
            <div key={product.productId} className='prod-inner'>

              <h2 id='h1'>Product Brand : {product.productBrand}</h2>
              <h2>Product Name : {product.productName}</h2>
              <h2>Product Type : {product.productType}</h2>
              <h2>Product Color : {product.productColor}</h2>
              <h2>Product Price : {product.productPrice}</h2>
              <h2>Product Quantity : {product.productQuantity <=9 ? "0" +product.productQuantity : product.productQuantity }</h2>
             
            <button id='update' onClick={()=>update(product.productId)} >Update</button>
            </div>
          ))) : (<h2>Choose Product Brand before Search</h2> )) : filterProductState == true && ( filterProduct.length >0  ? (filterProduct.map((product) =>(
            <div key={product.productId} className='prod-inner'>

              <h2>Product Brand : {product.productBrand}</h2>
             {filter == "ATOZ" || filter == "ZTOA" ? ( <h2 id='h1'>Product Name : {product.productName}</h2> ) :  <h2>Product Name : {product.productName}</h2>}
              <h2>Product Type : {product.productType}</h2>
              <h2>Product Color : {product.productColor}</h2>
              <h2>Product Price : {product.productPrice}</h2>
              {filter == "LOWTOHIGH" || filter == "HIGHTOLOW" ? ( <h2 id='h1'>Product Quantity : {product.productQuantity <=9 ? "0" +product.productQuantity : product.productQuantity }</h2> ) : <h2>Product Quantity : {product.productQuantity <=9 ? "0" +product.productQuantity : product.productQuantity }</h2> }
             
            <button id='update' onClick={()=>update(product.productId)} >Update</button>
            </div>
          ))) : (<h2>No Products for this Filter</h2> ))
        }
</div>

      </div>
    </div>
     
    </>
  );
};

export default ProductDetails;