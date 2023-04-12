import React from 'react';
import Form from '../../components/Form/FormAdd';
import Footer from '../../components/Footer/Footer';
import Navs from '../../components/Navbar/navbar';

const addrecipe = () => {
  const isLogin = localStorage.getItem('token');

  return (
    <>
      <Navs />
      <Form />
      <Footer />
    </>
  );
};
export default addrecipe;
