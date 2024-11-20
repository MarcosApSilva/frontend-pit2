import React, { useContext, ReactNode } from "react";
import {BrowserRouter as Router, Navigate, Route, Routes  } from 'react-router-dom'

import Login from "./pages/Login/Login";
import Register from './pages/Register/Register';
import EsqSenha from './pages/EsqueceuSenha/Esqueceusenha';
import AlterarSenha from './pages/AlterarSenha/AlterarSenha';
import Profile from './pages/Profile/Profile';

import MainPage from './pages/Main'
import CupcakesPage from './pages/Main/Cupcakes'
import BurgersPage from './pages/Main/Burgers'
import DrinksPage from './pages/Main/Drinks'
import IceCreamsPage from './pages/Main/IceCreams'
import PizzasPage from './pages/Main/Pizzas'

import MyCartPage from './pages/MyCart'
import OrderSuccessPage from './pages/Orders/Success'
import PaymentPage from './pages/Payment'
//import { AuthProvider, AuthContext } from "./contexts/authContext2";
import { AuthProvider, AuthContext } from "./contexts/authContext";


/*
interface AuthContextType {
  authenticated: boolean;
  //user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
*/  


//const AppRoutes: React.FC = () => {
export const AppRoutes: React.FC = () => {
  const Private: React.FC<{ children: ReactNode }> = ({ children }) => {
    //const { authenticated, loading } = useContext(AuthContext);
    const  AuthContextType  = useContext(AuthContext);
            
    if (AuthContextType?.loading) {
      return <div className="loading">Carregando...</div>;
    }

    if (!AuthContextType?.isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  };




  return (
    <AuthProvider>
    <Routes>
      <Route path='/' element={<MainPage />}>
        <Route path='/' element={<Private><CupcakesPage /></Private>} />
        <Route path='burgers' element={<Private><BurgersPage /></Private>} />
        <Route path='pizzas' element={<Private><PizzasPage /></Private>} />
        <Route path='drinks' element={<Private><DrinksPage /></Private>} />
        <Route path='ice-creams' element={<Private><IceCreamsPage /></Private>} />
      </Route>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/password" element={<EsqSenha />} />
      <Route path="/resetpassword" element={<AlterarSenha />} />
      <Route path="/profile" element={<Profile />} />



      <Route path='cart' element={<Private><MyCartPage /></Private>} />
      <Route path='payment' element={<Private><PaymentPage /></Private> } />
      <Route path='order'>
        <Route path='success/:orderId' element={<Private><OrderSuccessPage /></Private>} />
      </Route>
    </Routes>
    </AuthProvider>
  )
}
