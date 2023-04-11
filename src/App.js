import Dashborad from "./pages/Dashborad";
import Login from "./pages/Login";
import Protucted from "./pages/Protucted";
import Register from "./pages/Register";

import Orders from "./pages/Apis Page/Orders";
import EditOrder from "./pages/Apis Page/EditOrder";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import ViewOrder from "./pages/Apis Page/ViewOrder";

function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            {/* <Route path='/dashboard' element={<Dashborad/>} / > */}
            <Route path='/dashboard' element={<Protucted Component={Dashborad} />} />

            <Route path="/orders" element={<Orders/>} />
            <Route path="/editorder/:id" element={<EditOrder/>} />
            <Route path="/vieworder/:id" element={<ViewOrder/>} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
