import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { LoginProvider } from './hooks/useLogin';
import Sider from './components/Sider';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import AvatarPicker from './pages/Register/AvatarPicker';
import ContentEditor from './pages/Share';
import Test from './pages/Test';

const MainDiv = styled('div')`
  display: flex;
`;

function Main() {
  return (
    <MainDiv>
      <Sider />
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/avatar" element={<AvatarPicker />} />
        <Route path="/test" element={<Test />} />
        <Route path="/editor" element={<ContentEditor />} />
      </Routes>
    </MainDiv>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Main />
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
