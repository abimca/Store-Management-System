import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../CSS/StoreDetails.CSS'
// 2
const StoreDetails = () => {
let [result,setResult] = useState([])
let [selectedStore,setSelectedStore]= useState("") 
let navigate = useNavigate()

let[id,setId]=useState()

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
  let fetchStores=async()=>{

    try {

      setResult((await axios.get("http://localhost:8080/getAll")).data)
      
    } catch (error) {
      console.log(error);
      
    }

  }

  fetchStores()
},[])


  let fetchStore=()=>{
    validate()
    if(!selectedStore){
      alert("Please select the store")
      return;
    }
    navigate(`/branchDetails/${id}`)
    
  }

  let newStore =()=>{
    validate()
    navigate('/newStoreRegister')
  }

  let logOut=async()=>{
    const res1 = await axios.get('http://localhost:8080/deleteSession', { withCredentials: true });
    alert("Logout")
    navigate('/')
  }



  useEffect(()=>{

  if(!selectedStore) return;

    let fetchId= async()=>{
      try {
        let store = (await axios.get(`http://localhost:8080/getByLoc/${selectedStore}`)).data

        
        setId(store.storeId)

      console.log(store);
     
        
      } catch (error) {
        console.log("Please, Select the Location...");
        
        
      }
    }

    fetchId()
  },[selectedStore])
  return (
    <>
        <Navbar/>

        <div className='homeStore'>
        <div className="leftStore">
            <h1>Store Management</h1>
            <button id='b1' onClick={newStore}>New Store Register</button>
            <button id='b2' onClick={logOut}>Logout</button>
        </div>

        <div className='rightStore' ><p>Store Details  </p> 
        <select className='scroll-dropdown'  htmlFor="store"  onChange={(e)=>setSelectedStore(e.target.value)}>
            <option  value="Not Selected">Select Location</option>
           {
               result.map((ele)=>(
                <option key={ele.storeId}  value={ele.storeLocation}>{ele.storeLocation}</option>
               ))
               
            }
            
        </select>
        <button id='b3' onClick={fetchStore}>Fetch</button>
        </div> 
  
        </div>
    
    </>
  )
}

export default StoreDetails