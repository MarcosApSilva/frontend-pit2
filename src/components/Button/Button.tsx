import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

const Button = styled.button<ButtonProps>`
  background-color: ${({ variant }) => (variant === 'primary' ? '#007BFF' : '#6C757D')};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default Button;