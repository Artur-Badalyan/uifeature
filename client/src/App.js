import {Routes , Route } from "react-router-dom" 
import ProtectedRoute from "routes/ProtectedRoute/index.jsx";

import Layout from 'components/layout/index.jsx';
import Home from 'pages/home/index.jsx';
import Login from 'pages/login/index.jsx';
import Components from 'pages/components/index.jsx';

import { routes } from './config/index.js'
import logo from './logo.svg';
import './App.css';


function App() {

  const isAuthorized = true;
  return ( 
    <div className="App w-full">
      <Routes>
        <Route path="/login" element={<Login /> } />
        <Route element={<Layout />} >
          <Route path="/" element={<Home /> } />
          <Route path={routes.components} element={<Components /> } />
          <Route element={<ProtectedRoute  isAuthorized={isAuthorized} />}>
            <Route path="/profile" element={<Components /> } />
          </Route>
        </Route>
      </Routes>
    </div> 
  )
}

export default App;
