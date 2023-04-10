import Dashborad from "./pages/Dashborad";
import Login from "./pages/Login";
import Protucted from "./pages/Protucted";
import Register from "./pages/Register";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            {/* <Route path='/dashboard' element={<Dashborad/>} / > */}
            <Route path='/dashboard' element={<Protucted Component={Dashborad} />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
