import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/authContext2";
import { Outlet } from 'react-router-dom'
import { MyOrder } from '../../components/MyOrder'
import { Sidebar } from '../../components/Sidebar'
import { Container } from './styles'
import logoImg from '../../assets/logo.svg'



export default function Main() {
  //const { user, logout } = useContext(AuthContext);
  const AuthContextType = useContext(AuthContext);


  const handleLogout = () => {
    //console.log('logout');
    AuthContextType?.logout();
  }
  

  return (
    <Container>
      <Sidebar />
      <section>
        <img src={logoImg} alt="logotipo" />
        <button onClick={handleLogout} className="btn btn-secondary">Sair</button>
        <Outlet />
      </section>
      <MyOrder />
    </Container>
  )
}
