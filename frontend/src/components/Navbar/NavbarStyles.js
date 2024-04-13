import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  background-color: #333;
  color: #fff;
  padding: 1rem 0;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const Logo = styled(Link)`
  font-size: 1.5rem;
  color: #fff;
  text-decoration: none;
`;

export const Nav = styled.nav``;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center; /* Center items vertically */
`;

export const NavItem = styled.li`
  margin-left: 1rem;
`;

export const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #ffd700;
  }
`;

export const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #dc3545; /* Red color for logout button */
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333; /* Darker red on hover */
  }
`;

// Additional CSS styles for responsive design or specific elements
export const StyledSpan = styled.span`
  color: #fff;
  font-weight: bold;
  margin-right: 10px;
`;

// Media query for responsiveness
const breakpoint = '768px';

export const ResponsiveContainer = styled(Container)`
  padding: 0 2rem; /* Increased padding for larger screens */
  
  @media (max-width: ${breakpoint}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
