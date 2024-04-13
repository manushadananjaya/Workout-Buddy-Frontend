import React from 'react';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import {
  Header,
  ResponsiveContainer,
  Logo,
  Nav,
  NavList,
  NavItem,
  NavLink,
  LogoutButton,
  StyledSpan,
} from './NavbarStyles'; // Import styled components with CSS styles

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <Header>
      <ResponsiveContainer>
        <Logo to="/">Workout Buddy</Logo>
        <Nav>
          <NavList>
            {user ? (
              <>
                <StyledSpan>Welcome, {user.email}</StyledSpan>
                <NavItem>
                  <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/signup">Signup</NavLink>
                </NavItem>
              </>
            )}
          </NavList>
        </Nav>
      </ResponsiveContainer>
    </Header>
  );
};

export default Navbar;
