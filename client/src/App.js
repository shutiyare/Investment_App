import { Routes, Route } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Query from './pages/query/Query';
import Register from './pages/register/Register';
import User from './pages/user/User';
import Notfound from './pages/404/Notfound';
import Unauthorized from './pages/404/Unauthorized';
import RequireAuth from './components/auth/RequireAuth'
import Layout from './Layout';
import './App.css';


const ROLES = {
  'User': 775,
  'Admin': 777
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* User routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/query" element={<Query />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* Admin routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        {/* Not found Pages */}
        <Route path="/*" element={<Notfound />} />

      </Route>
    </Routes>
  );
}

export default App;
