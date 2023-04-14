import Dashborad from "./pages/Dashborad";
import Login from "./pages/Login";
import Protucted from "./pages/Protucted";
import Register from "./pages/Register";

import ViewOrder from "./pages/Apis Page/ViewOrder";
import Orders from "./pages/Apis Page/Orders";
import EditOrder from "./pages/Apis Page/EditOrder";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Shops from "./pages/Apis Page/Shops";
import EditShop from "./pages/Apis Page/EditShop";
import AddShop from "./pages/Apis Page/AddShop";

function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            {/* <Route path='/dashboard' element={<Dashborad/>} / > */}
            <Route path='/dashboard' element={<Protucted Component={Dashborad} />} />

            <Route path="/orders" element={<Protucted Component={Orders} />} />
            <Route path="/editorder/:id" element={<Protucted Component={EditOrder} />} />
            <Route path="/vieworder/:id" element={<Protucted Component={ViewOrder} />} />


            <Route path='/shops' element={<Shops/>} />
            <Route path="/editshop/:id" element={<EditShop/>} />
            <Route path='/addshop' element={<AddShop/>} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
