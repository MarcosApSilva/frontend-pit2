import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/authContext';

const Menu = styled.div`
  position: relative;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const MenuItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const DropdownMenu: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Menu>
      <MenuButton>{user?.usuario}</MenuButton>
      <Dropdown>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Dropdown>
    </Menu>
  );
};

export default DropdownMenu;
