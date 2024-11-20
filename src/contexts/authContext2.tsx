import React, { useRef, useState, useEffect, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { api, createSession } from "../services/api";

interface User {
  // Define the properties of the User object based on your API response
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  authenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  //login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      setUser(JSON.parse(user));
      //api.defaults.headers.Authorization = `Bearer ${token}`;

      api.interceptors.request.use((config) => {
        //const token = // Recupere o token aqui;
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        ///config.headers.Authorization = `Bearer ${token}`
        return config;
      });      

    }

    setLoading(false);
  }, []);

  //const login = async (email: string, password: string) => {
  //const login = async (email: string, password: string) => {
  const login = async (email: string, password: string): Promise<void> => {
    try {
      //const response = await createSession(email, password);
      const response = await createSession(email, password);

      //localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);

      //api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;


      setUser(response.data.user);
      navigate('/');
    } catch (err: any) {
      if (!err?.response) {
        alert('Nenhuma resposta do Servidor!');
      } else if (err.response?.status === 400) {
        alert(err.response.data.error);
      } else if (err.response?.status === 401) {
        alert(err.response.data.error);
      } else {
        alert('Falha de login');
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    api.defaults.headers.common['Authorization'] = '';

    //api.defaults.headers.['Authorization'] = null;
    //api.defaults.headers.common['Authorization'] = null;

    setUser(null);

    navigate('/login');
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        login,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
}
