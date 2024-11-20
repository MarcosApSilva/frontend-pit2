import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
//import * as yup from 'yup';
//import { formLogin } from './styles'
import styled from 'styled-components';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  background: #99b3ff;
  background-color: #00134d;
  padding: 20px;
  border: 2px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
`;



const Login: React.FC = () => {
  //const { login } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    //login(email, password);
  }



  return (


    <Container>
      <Form>
        <h2 className="title">Login</h2>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">E-mail</label>
          <Input 
            type="email" 
            placeholder="Seu e-mail" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Senha</label>
          <Input 
            type="password" 
            placeholder="Sua senha" 
            id="exampleInputPassword1" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className="actions">
          <Button variant="primary">Login</Button>
          <Button onClick={handleLogin} >Entrar</Button>
        </div>
        
        <p>
          Criar cadastro: <Link to="/register">Registrar</Link>
        </p><br/>
        <p>
          Esqueceu a senha: <Link to="/password">Clique aqui</Link>
        </p>
      </Form>
    </Container>

    /*
    <div id="login">
      <h1 className="title">Login</h1>
      <div className="form">

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">E-mail</label>
          <input 
            type="email" 
            className="form-control" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp" 
            placeholder="Seu email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Senha</label>
          <input 
            type="password" 
            className="form-control" 
            id="exampleInputPassword1" 
            placeholder="Senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="actions">
          <button onClick={handleLogin} className="btn btn-primary">Entrar</button>
        </div>
        <br />

      </div>
    </div>
    */
  )
};

export default Login;

