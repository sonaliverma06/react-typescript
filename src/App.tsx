import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUser from './Components/AddUser';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import ViewUser from './Components/ViewUser';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
      <Route path="/adduser" element={<AddUser />}></Route>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/viewuser" element={<ViewUser />}></Route>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
