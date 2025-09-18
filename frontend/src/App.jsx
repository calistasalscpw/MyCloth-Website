import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import Navbar from './components/Navbar';
import FooterSection from './components/FooterSection';
import Home from './pages/Home';
import Login from './pages/Login';

import { Layout } from 'antd';

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh', background: ''}}>
      <Navbar/>
      <Content>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth/login' element={<Login/>}/>
        </Routes>
      </Content>
      <FooterSection/>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
