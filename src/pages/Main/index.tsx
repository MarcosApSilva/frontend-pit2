import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Outlet } from 'react-router-dom'
import { MyOrder } from '../../components/MyOrder'
import { Sidebar } from '../../components/Sidebar'
import { Container } from './styles'
import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button/Button';



export default function Main() {
  //const { user, logout } = useContext(AuthContext);
  const AuthContextType = useContext(AuthContext);
  const [loading, setLoading] = useState(false);


  const handleLogout = () => {
    //console.log('logout');
    AuthContextType?.logout();
  }
  

  return (
    <Container>
      <Sidebar />
      <section>
        <img src={logoImg} alt="logotipo" />
        {/*<button onClick={handleLogout} className="btn btn-secondary">Sair</button>*/}


        <Button variant="primary" type="submit" disabled={loading} onClick={handleLogout}>
          {loading ? 'Logging in...' : 'Sair'  }
        </Button>



        <Outlet />
      </section>
      <MyOrder />
    </Container>
  )
}
