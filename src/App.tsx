import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from 'components/header';
import Hero from 'components/hero';
import { UsersSection } from 'components/users-section';
import { RegisterSection } from 'components/register-section';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <UsersSection />
      <RegisterSection />
      <ToastContainer theme="light" position="top-center" autoClose={5000} />
    </>
  );
};

export default App;
