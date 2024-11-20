import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useAuth } from '../../contexts/authContext';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  background: #fff;
  background-color: #000080;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const EsqSenha: React.FC = () => {
  const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  const { esqsenha } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await esqsenha(email);
	  //enviar email
      navigate('/'); // Redireciona após o login
    } catch (error) {
      console.error('Erro no esqueceu minha senha:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Esqueci minha senha</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
        <p>
          Já tenho conta? <Link to="/">Login</Link>
        </p>
      </Form>
    </Container>
  );
};

export default EsqSenha;
