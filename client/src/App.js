import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom'
import {Login,Home,Public,Service,DetailProduct,FAQ,Products,Blogs,Final_Register,ResetPassword} from 'pages/public'
import { AdminLayout, ManageOrder, ManageProduct, ManageUser, CreateProduct, DashBoard} from 'pages/admin'
import { UserLayout, MyCart, History, Personal, WishList} from 'pages/user'
import path from './ultils/path'
import {getCategories} from 'store/app/asyncAction'
import {useDispatch, useSelector} from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './components';

function App() {
  const dispatch = useDispatch()
  const {isShowModal, modalChildren} = useSelector(state => state.app)

  useEffect(() =>{
    dispatch(getCategories())
  },[])
  return (
    <div className="font-main relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
     <Routes>
      <Route path={path.PUBLIC} element={<Public />}>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.BLOGS} element={<Blogs />} />
        <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
        <Route path={path.FAQS} element={<FAQ />} />
        <Route path={path.OUR_SERVICES} element={<Service />} />
        <Route path={path.PRODUCTS} element={<Products />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.ALL} element={<Home />} />
      </Route>
      <Route path={path.ADMIN} element={<AdminLayout />}>
        <Route path={path.DASHBOARD} element={<DashBoard/>}/>
        <Route path={path.MANAGE_ORDER} element={<ManageOrder/>}/>
        <Route path={path.MANAGE_PRODUCT} element={<ManageProduct/>}/>
        <Route path={path.MANAGE_USER} element={<ManageUser/>}/>
        <Route path={path.CREATE_PRODUCT} element={<CreateProduct/>}/>
      </Route>
      <Route path={path.USER} element={<UserLayout />}>
        <Route path={path.PERSONAL} element={<Personal />}/>
        <Route path={path.MYCART} element={<MyCart id='cart' />}/>
        <Route path={path.HISTORY} element={<History/>}/>
        <Route path={path.WISHLIST} element={<WishList/>}/>
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