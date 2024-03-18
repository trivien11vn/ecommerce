import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom'
import {Login,Home,Public,Service,DetailProduct,FAQ,Products,Blogs,Final_Register,ResetPassword} from './pages/public'
import path from './ultils/path'
import {getCategories} from './store/app/asyncAction'
import {useDispatch} from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(getCategories())
  },[])
  return (
    <div className="min-h-screen font-main">
     <Routes>
      <Route path={path.PUBLIC} element={<Public />}>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.BLOGS} element={<Blogs />} />
        <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
        <Route path={path.FAQS} element={<FAQ />} />
        <Route path={path.OUR_SERVICES} element={<Service />} />
        <Route path={path.PRODUCTS} element={<Products />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
      </Route>
      <Route path={path.FINAL_REGISTER} element={<Final_Register />} />
      <Route path={path.LOGIN} element={<Login />} />
     </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
      <ToastContainer />
    </div>
  );
}

export default App;