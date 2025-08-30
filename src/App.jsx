import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home'

import { Layout } from 'antd';

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh', background: ''}}>
      <Content>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
