import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeDetails from './pages/EmployeeDetails';
import RequireAuth from './components/RequireAuth';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="top-banner text-center">
          <strong>Employee Management App</strong>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/employees" element={<><NavBar /><EmployeeList /></>} />
            <Route path="/employees/new" element={<><NavBar /><EmployeeForm /></>} />
            <Route path="/employees/:id" element={<><NavBar /><EmployeeDetails /></>} />
            <Route path="/employees/:id/edit" element={<><NavBar /><EmployeeForm /></>} />
          </Route>

          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
