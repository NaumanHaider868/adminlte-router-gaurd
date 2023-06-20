import Dashborad from "./pages/Dashborad";
import Login from "./pages/Login";
import Protucted from "./pages/Protucted";
import Register from "./pages/Register";

import ViewOrder from "./pages/Admin/Orders/ViewOrder";
import Orders from "./pages/Admin/Orders/Orders";
import EditOrder from "./pages/Admin/Orders/EditOrder";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shops from "./pages/Admin/Shops/Shops";
import EditShop from "./pages/Admin/Shops/EditShop";
import AddShop from "./pages/Admin/Shops/AddShop";

import Owner from "./pages/Admin/Owner/Owner";
import EditOwner from "./pages/Admin/Owner/EditOwner";
import ViewOwner from "./pages/Admin/Owner/ViewOwner";
import Coupons from "./pages/Admin/Coupons/Coupons";
import EditCoupon from "./pages/Admin/Coupons/EditCoupon";
import ViewCoupon from "./pages/Admin/Coupons/ViewCoupon";
import AddCoupon from "./pages/Admin/Coupons/AddCoupon";
import Admin from "./pages/Admin/Admin";
import Customers from './pages/Admin/Customers/Customers'
import EditCustomer from './pages/Admin/Customers/EditCustomer'
import ViewCustomer from "./pages/Admin/Customers/ViewCustomer";
import Deliverymans from "./pages/Admin/DeliveryMan/Deliverymans";
import EditDeliveryMan from './pages/Admin/DeliveryMan/EditDeliveryMan'
import AddDeliveryMen from "./pages/Admin/DeliveryMan/AddDeliveryMen";
import ViewDeliveryMan from "./pages/Admin/DeliveryMan/ViewDeliveryMan";
import AddOwner from "./pages/Admin/Owner/AddOwner";
import ViewCategories from "./pages/Admin/Categories";
import AddCategorie from "./pages/Admin/AddCategorie";
import ViewItems from "./pages/Admin/Items";
import AddItem from "./pages/Admin/AddItem";
import ViewShop from "./pages/Admin/Shops/ViewShop";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from "./pages/ForgetPassword";
import ShopOrder from "./pages/Admin/Shops/ShopOrder";
import ViewShopOrder from "./pages/Admin/Shops/ViewShopOrder";
import EditShopOrder from "./pages/Admin/Shops/EditShopOrder";
import AdminProfile from "./pages/Admin/AdminProfile";
import EditAdminProfile from "./pages/Admin/EditAdminProfile";
import DeliveryManOrders from "./pages/Admin/DeliveryMan/DeliveryManOrders";
import CustomerOrders from "./pages/Admin/Customers/CustomerOrders";

import Categorie from "./pages/Admin/others/Categories.jsx";
import Items from "./pages/Admin/others/Items.jsx";
import AddItems from "./pages/Admin/others/AddItem.jsx";
import AddCategories from "./pages/Admin/others/AddCategorie.jsx";
import EditCustomerOrder from "./pages/Admin/Customers/EditCustomerOrder";
import ViewCustomerOrder from "./pages/Admin/Customers/ViewCustomerOrder";

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Protucted Component={Register} />} />
          <Route path='/dashboard' element={<Protucted Component={Dashborad} />} />
          <Route path="/forgetpassword" element={<Protucted Component={ForgetPassword} />} />

          <Route path="/categorie" element={<Protucted Component={Categorie} />} />
          <Route path="/item" element={<Protucted Component={Items} />} />
          <Route path="/addcategories" element={<Protucted Component={AddCategories} />} />
          <Route path="/additems" element={<Protucted Component={AddItems} />} />



          <Route path="/admin" element={<Protucted Component={Admin} />} />
          <Route path="/viewcategories" element={<Protucted Component={ViewCategories} />} />
          <Route path="/addcategorie" element={<Protucted Component={AddCategorie} />} />
          <Route path="/viewitems" element={<Protucted Component={ViewItems} />} />
          <Route path='/additem' element={<Protucted Component={AddItem} />} />
          <Route path="/profile" element={<Protucted Component={AdminProfile} />} />
          <Route path="/editprofile" element={<Protucted Component={EditAdminProfile} />} />

          <Route path="/orders" element={<Protucted Component={Orders} />} />
          <Route path="/editorder/:id" element={<Protucted Component={EditOrder} />} />
          <Route path="/vieworder/:id" element={<Protucted Component={ViewOrder} />} />


          <Route path='/shops' element={<Protucted Component={Shops} />} />
          <Route path="/editshop/:id" element={<Protucted Component={EditShop} />} />
          <Route path='/addshop' element={<Protucted Component={AddShop} />} />
          <Route path='/viewshop/:id' element={<Protucted Component={ViewShop} />} />
          <Route path='/shoporder/:id' element={<Protucted Component={ShopOrder} />} />
          <Route path='/viewshoporder/:id/:id1' element={<Protucted Component={ViewShopOrder} />} />
          <Route path='/editshoporder/:id/:id1' element={<Protucted Component={EditShopOrder} />} />


          <Route path='/owner' element={<Protucted Component={Owner} />} />
          <Route path='/editowner/:id' element={<Protucted Component={EditOwner} />} />
          <Route path='/viewowner/:id' element={<Protucted Component={ViewOwner} />} />
          <Route path='/addowner' element={<Protucted Component={AddOwner} />} />

          <Route path="/customer" element={<Protucted Component={Customers} />} />
          <Route path="/editcustomer/:id" element={<Protucted Component={EditCustomer} />} />
          <Route path='/viewcustomer/:id' element={<Protucted Component={ViewCustomer} />} />
          <Route path='/customerorders/:id' element={<Protucted Component={CustomerOrders} />} />
          <Route path='/editcustomerorders/:id' element={<Protucted Component={EditCustomerOrder} />} />
          <Route path='/viewcustomerorders/:id' element={<Protucted Component={ViewCustomerOrder} />} />
          

          <Route path='/coupons' element={<Protucted Component={Coupons} />} />
          <Route path='/editcoupon/:id' element={<Protucted Component={EditCoupon} />} />
          <Route path="/viewcoupon/:id" element={<Protucted Component={ViewCoupon} />} />
          <Route path="/addcoupon" element={<Protucted Component={AddCoupon} />} />

          <Route path="/deliveryman" element={<Protucted Component={Deliverymans} />} />
          <Route path='/editdeliveryman/:id' element={<Protucted Component={EditDeliveryMan} />} />
          <Route path='/adddeliverymen' element={<Protucted Component={AddDeliveryMen} />} />
          <Route path='/viewdeliveryman/:id' element={<Protucted Component={ViewDeliveryMan} />} />
          <Route path='/deliverymanorders/:id' element={<Protucted Component={DeliveryManOrders} />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
