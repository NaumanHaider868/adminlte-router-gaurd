import Dashborad from "./pages/Dashborad";
import Login from "./pages/Login";
import Protucted from "./pages/Protucted";
import Register from "./pages/Register";

import ViewOrder from "./pages/Admin/AdminOrders/ViewOrder";
import Orders from "./pages/Admin/AdminOrders/Orders";
import EditOrder from "./pages/Admin/AdminOrders/EditOrder";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shops from "./pages/Admin/AdminShops/Shops";
import EditShop from "./pages/Admin/AdminShops/EditShop";
import AddShop from "./pages/Admin/AdminShops/AddShop";

import Owner from "./pages/Admin/AdminOwner/Owner";
import EditOwner from "./pages/Admin/AdminOwner/EditOwner";
import ViewOwner from "./pages/Admin/AdminOwner/ViewOwner";
import Coupons from "./pages/Admin/AdminCoupons/Coupons";
import EditCoupon from "./pages/Admin/AdminCoupons/EditCoupon";
import ViewCoupon from "./pages/Admin/AdminCoupons/ViewCoupon";
import AddCoupon from "./pages/Admin/AdminCoupons/AddCoupon";
import Admin from "./pages/Admin/Admin";
import Customers from './pages/Admin/AdminCustomers/Customers'
import EditCustomer from './pages/Admin/AdminCustomers/EditCustomer'
import ViewCustomer from "./pages/Admin/AdminCustomers/ViewCustomer";
import Deliverymans from "./pages/Admin/AdminDeliveryMan/Deliverymans";
import EditDeliveryMan from './pages/Admin/AdminDeliveryMan/EditDeliveryMan'
import AddDeliveryMen from "./pages/Admin/AdminDeliveryMan/AddDeliveryMen";
import ViewDeliveryMan from "./pages/Admin/AdminDeliveryMan/ViewDeliveryMan";
import AddOwner from "./pages/Admin/AdminOwner/AddOwner";
import ViewCategories from "./pages/Admin/ViewCategories";
import AddCategorie from "./pages/Admin/AddCategorie";
import ViewItems from "./pages/Admin/ViewItems";
import AddItem from "./pages/Admin/AddItem";
import ViewShop from "./pages/Admin/AdminShops/ViewShop";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from "./pages/ForgetPassword";
import ShopOrder from "./pages/Admin/AdminShops/ShopOrder";
import ViewShopOrder from "./pages/Admin/AdminShops/ViewShopOrder";
import EditShopOrder from "./pages/Admin/AdminShops/EditShopOrder";

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Protucted Component={Dashborad} />} />
          <Route path="/forgetpassword" element={<ForgetPassword/>} />


          <Route path="/admin" element={<Admin />} />
          <Route path="/viewcategories" element={<ViewCategories />} />
          <Route path="/addcategorie" element={<AddCategorie />} />
          <Route path="/viewitems" element={<ViewItems />} />
          <Route path='/additem' element={<AddItem />} />

          <Route path="/orders" element={<Protucted Component={Orders} />} />
          <Route path="/editorder/:id" element={<Protucted Component={EditOrder} />} />
          <Route path="/vieworder/:id" element={<Protucted Component={ViewOrder} />} />


          <Route path='/shops' element={<Shops />} />
          <Route path="/editshop/:id" element={<EditShop />} />
          <Route path='/addshop' element={<AddShop />} />
          <Route path='/viewshop/:id' element={<ViewShop />} />
          <Route path='/shoporder/:id' element={<ShopOrder />} />
          <Route path='/viewshoporder/:id/:id1' element={<ViewShopOrder/>} />
          <Route path='/editshoporder/:id/:id1' element={<EditShopOrder/>} />

          

          <Route path='/owner' element={<Protucted Component={Owner} />} />
          <Route path='/editowner/:id' element={<Protucted Component={EditOwner} />}/>
          <Route path='/viewowner/:id' element={<Protucted Component={ViewOwner} />} />
          <Route path='/addowner' element={<Protucted Component={AddOwner} />} />

          <Route path="/customer" element={<Customers />} />
          <Route path="/editcustomer/:id" element={<EditCustomer />} />
          <Route path='/viewcustomer/:id' element={<ViewCustomer />} />

          <Route path='/coupons' element={<Coupons />} />
          <Route path='/editcoupon/:id' element={<EditCoupon />} />
          <Route path="/viewcoupon/:id" element={<ViewCoupon />} />
          <Route path="/addcoupon" element={<AddCoupon />} />

          <Route path="/deliveryman" element={<Deliverymans />} />
          <Route path='/editdeliveryman/:id' element={<EditDeliveryMan />} />
          <Route path='/adddeliverymen' element={<AddDeliveryMen />} />
          <Route path='/viewdeliveryman/:id' element={<ViewDeliveryMan />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
