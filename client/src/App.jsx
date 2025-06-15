import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import './App.css';
import './index.css';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ResetPassword } from './pages/ResetPassword';
import { Profile } from './pages/Profile';

function Layout(){
  const user = null;
  const location = useLocation();

  return user?.token ? (
    <Outlet/>
  ) : (
    <Navigate to='/login' state={{from: location}} replace/>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}> 
          <Route path='/' element={<Home/>}></Route>
          <Route path='/profile/:id' element={<Profile/>}></Route>
        </Route>

        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/reset-password' element={<ResetPassword/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
