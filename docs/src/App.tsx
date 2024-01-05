import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LoginEmailPage from './pages/LoginEmailPage';
import Header from './component/common/Header';
import BottomMenu from './component/common/BottomMenu';
import Footer from './component/common/Footer';
import SignupPage from './pages/SignupPage';
import Authpage from './pages/AuthPage';
import MentorPage from './pages/MentorPage';
import MentorListPage from './pages/MentorListPage';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/magnet" Component={HomePage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/loginemail" Component={LoginEmailPage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/auth" Component={Authpage} />
        <Route path="/mentor" Component={MentorPage} />
        <Route path="/mentorlist" Component={MentorListPage} />
      </Routes>
      <BottomMenu />
      <Footer />
    </div>
  );
}

export default App;
