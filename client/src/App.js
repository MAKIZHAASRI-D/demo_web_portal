import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './loginpage';
import AdminPage from './admindropdown';
import UserDashboard from './userdashboard';
import AdminDropdownManager from './admindropdown';
import OperatorProductionForm from './operatorform';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/add" element={<AdminDropdownManager/>}/>
        <Route path="/operatorform" element={<OperatorProductionForm/>} />
        
      </Routes>
    </Router>
  );
}
export default App;