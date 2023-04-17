import Dashborad from "./pages/Dashborad";
import Login from "./pages/Login";
import Protucted from "./pages/Protucted";
import Register from "./pages/Register";

import ViewOrder from "./pages/Apis Page/ViewOrder";
import Orders from "./pages/Apis Page/Orders";
import EditOrder from "./pages/Apis Page/EditOrder";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shops from "./pages/Apis Page/Shops";
import EditShop from "./pages/Apis Page/EditShop";
import AddShop from "./pages/Apis Page/AddShop";

import Owner from "./pages/Apis Page/Owner";
import EditOwner from "./pages/Apis Page/EditOwner";
import ViewOwner from "./pages/Apis Page/ViewOwner";
import Coupons from "./pages/Apis Page/Coupons";
import EditCoupon from "./pages/Apis Page/EditCoupon";
import ViewCoupon from "./pages/Apis Page/ViewCoupon";
import AddCoupon from "./pages/Apis Page/AddCoupon";
import Admin from "./pages/Apis Page/Admin";
import Customers from './pages/Apis Page/Customers'
import EditCustomer from './pages/Apis Page/EditCustomer'
import ViewCustomer from "./pages/Apis Page/ViewCustomer";
import Deliverymans from "./pages/Apis Page/Deliverymans";
import EditDeliveryMan from './pages/Apis Page/EditDeliveryMan'
import AddDeliveryMen from "./pages/Apis Page/AddDeliveryMen";
import ViewDeliveryMan from "./pages/Apis Page/ViewDeliveryMan";
import AddOwner from "./pages/Apis Page/AddOwner";
import ViewCategories from "./pages/Apis Page/ViewCategories";
import AddCategorie from "./pages/Apis Page/AddCategorie";
import ViewItems from "./pages/Apis Page/ViewItems";
import AddItem from "./pages/Apis Page/AddItem";
import ViewShop from "./pages/Apis Page/ViewShop";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Protucted Component={Dashborad} />} />


          <Route path="/admin" element={<Admin />} />
          <Route path="/viewcategories" element={<ViewCategories/>} />
          <Route path="/addcategorie" element={<AddCategorie/>} />
          <Route path="/viewitems" element={<ViewItems/>} />
          <Route path='/additem' element={<AddItem/>} />

          <Route path="/orders" element={<Protucted Component={Orders} />} />
          <Route path="/editorder/:id" element={<Protucted Component={EditOrder} />} />
          <Route path="/vieworder/:id" element={<Protucted Component={ViewOrder} />} />


          <Route path='/shops' element={<Shops />} />
          <Route path="/editshop/:id" element={<EditShop />} />
          <Route path='/addshop' element={<AddShop />} />
          <Route path='/viewshop/:id' element={<ViewShop/>} />

          <Route path='/owner' element={<Owner />} />
          <Route path='/editowner/:id' element={<EditOwner />} />
          <Route path='/viewowner/:id' element={<ViewOwner />} />
          <Route path='/addowner' element={<AddOwner />} />

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
