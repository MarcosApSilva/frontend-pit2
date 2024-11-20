import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
//import api from '../services/api';
import { api, createSession } from "../services/api";

interface User {
  id: string;
  usuario: string;
  email: string;
}

// Tipos do Contexto
export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, usuario: string, phone: string, imagem: string, ativo: string) => Promise<void>;
  esqsenha: (email: string) => Promise<void>;
  resetsenha: (resetToken: string, newPassword: string) => Promise<void>;
  sendEmailConfirmation: (email: string) => Promise<void>;  fetchProfile: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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





  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await createSession(email, password);  

      localStorage.setItem('usuario', response.data.user.usuario);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
  
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);

      const msg = JSON.stringify(response.data.user.usuario);
      alert(`Seja bem vindo(a): ${msg}`);
      setIsAuthenticated(true);

      navigate('/');
  
    } catch (err: any) {
        if (!err?.response) {
          alert('Nenhuma resposta do Servidor!');
        } else if (err.response?.status === 400) {
          alert(err.response.data.error);
        } else if (err.response?.status === 401) {
          alert(err.response.data.error);
        } else if (err.response?.status === 403) {
          const msg = JSON.stringify(err.response.data.message);
          alert(`${msg}`);
        } else {
          alert('Falha de login');
        }
      }
  };

  const register = async (email: string, password: string, usuario: string, phone: string, imagem: string, ativo: string): Promise<void> => {
    try {
      const response = await api.post('/auth/register', { email, password, usuario, phone, imagem, ativo });
      console.log('Usuário registrado:', response.data);
      const msg = JSON.stringify(response.data.message);
      alert(`${msg}`);
    } catch (err: any) {
      console.error('Erro ao registrar usuário:', err);
      alert(err.response.data.error);
      throw err;
    }
  };

  // Esqueceu minha senha / sera enviado email para o usuario
  const esqsenha = async (email: string): Promise<void> => {
    try {
      const response = await api.post('/auth/password', { email });
      console.log('Foi enviando email para alteração de senha:', response.data);
      alert(`Esqueceu minha senha: ${response.data}`);
    } catch (err: any) {
      console.error('Erro ao enviar email:', err);
      alert(err.response.data.error);
      throw err;
    }
  };

  const resetsenha = async (resetToken: string, newPassword: string): Promise<void> => {
    try {
      const response = await api.post('/auth/resetpassword', { resetToken, newPassword });
      console.log('Senha alterada com sucesso:', response.data);
      alert(`Senha alterada com sucesso: ${response.data}`);
    } catch (err: any) {
      console.error('Erro ao alterar senha', err);
      alert(err.response.data.error);
      throw err;
    }
  };



  const sendEmailConfirmation = async (email: string): Promise<void> => {
    try {
      await api.post('/auth/send-confirmation-email', { email });
    } catch (err: any) {
        console.error('Erro ao enviar email de confirmação', err);
        alert(err.response.data.error);
        throw err;
      }
  };

  const fetchProfile = async (): Promise<void> => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch (err: any) {
      console.error('Erro ao buscar perfil do usuário:', err);
      alert(err.response.data.error);
    }
  };



  const logout = (): void => {
    //console.log('Usuário desconectado');
    setIsAuthenticated(false);
    localStorage.removeItem('usuario');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization'] = '';
    setUser(null);
    navigate('/login');
  };


  //authenticated: !!user,
  return (
    <AuthContext.Provider
        value={{ isAuthenticated: !!user, 
                 user, 
                 loading,
                 login, 
                 register, 
                 esqsenha, 
                 resetsenha, 
                 sendEmailConfirmation, 
                 fetchProfile, 
                 logout 
                }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir o contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
