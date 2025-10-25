import React from 'react'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import StoreDetails from './Components/StoreDetails'
import NewStoreRegistraion from './Components/NewStoreRegistraion'
import BranchDetails from './Components/BranchDetails'
import FetchProductDetails from './Components/FetchProductDetails'
import UpdateProduct from './Components/UpdateProduct'
import AddProduct from './Components/AddProduct'
import RemoveProduct from './Components/RemoveProduct'
import FetchQuantityLess from './Components/FetchQuantityless'
const App = () => {
  return (
    <>

      
      <BrowserRouter>
          <Routes>

            <Route path='/' element={<Home/>}></Route>
            <Route path='/storeDetails' element={<StoreDetails/>}></Route>
            <Route path='/newStoreRegister' element={<NewStoreRegistraion/>}></Route>
            <Route path='/branchDetails/:id' element={<BranchDetails/>}></Route>
            <Route path='/addProduct/:id' element={<AddProduct/>}></Route>
            <Route path='/fetchProductDetails/:id' element={<FetchProductDetails/>}></Route>
            <Route path='/removeProductDetails/:id' element={<RemoveProduct/>}></Route>
            <Route path='/updateProduct/:pid/:sid' element={<UpdateProduct/>}></Route>
            <Route path='/fetchQuantityless/:id' element={<FetchQuantityLess/>}></Route>
          </Routes>
      </BrowserRouter>

    
    
    </>
  )
}

export default App