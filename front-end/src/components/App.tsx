import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OwnerSignUp from './signup/OwnerSignUp';
import EmployeeSignUp from './signup/EmployeeSignUp';
import Dashboard from './dashboard/Dashboard';

import '../css/App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { UserProvider } from './context/UserContext';
import LogIn from './login/LogIn';
import { EmployeeProvider } from './context/EmployeesContext';

function App() {
  return (
    <UserProvider>
      <EmployeeProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/owner/signup" element={<OwnerSignUp />} />
              <Route path="/employee/signup" element={<EmployeeSignUp />} />
              <Route path="/user/login" element={<LogIn />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<LogIn />} />
            </Routes>
          </div>
        </Router>
      </EmployeeProvider>
    </UserProvider>
  );
}

export default App;
