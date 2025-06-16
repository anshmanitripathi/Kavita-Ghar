import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import './App.css';
import './index.css';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ResetPassword } from './pages/ResetPassword';
import { Profile } from './pages/Profile';
import { useSelector } from 'react-redux';

function Layout(){
  const {user} = useSelector((state)=>state.user);
  const location = useLocation();
  console.log(user);

  return user?.token ? (
    <Outlet/>
  ) : (
    <Navigate to='/login' state={{from: location}} replace/>
  );
}

function App() {
  const { theme} = useSelector((state)=> state.theme);
  return (
    
    <div data-theme={theme}>
      <BrowserRouter>
      <Routes>
        {/* <Route element={<Layout />}>  */}
          <Route path='/' element={<Home/>}></Route>
          <Route path='/profile/:id' element={<Profile/>}></Route>
        {/* </Route> */}

        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/reset-password' element={<ResetPassword/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
