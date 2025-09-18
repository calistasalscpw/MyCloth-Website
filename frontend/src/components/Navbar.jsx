import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

// --- Styled Components ---

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease;

  ${({ $isScrolled }) =>
    $isScrolled &&
    css`
      background-color: rgba(255, 233, 238, 0.8);
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    `}
`;

const Logo = styled(Link)`
  color: #E63B7A;
  font-weight: bold;
  font-size: 1.5rem;
  font-family: 'Playfair Display', serif;
  text-decoration: none;
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #641632;
  text-decoration: none;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  position: relative;
  padding-bottom: 4px;
`;

const MobileMenuIcon = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: rgba(255, 233, 238, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-150%)')};
  transition: transform 0.3s ease-in-out;
  opacity: ${({ open }) => (open ? '1' : '0')};

  a {
    padding: 1rem;
    color: #641632;
    text-decoration: none;
    font-weight: 500;
    width: 100%;
    text-align: center;
  }
`;

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleScrollToFooter = (e) => {
        e.preventDefault();
        const footer = document.getElementById('footer');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    const handleNavigate = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };
    
    return (
        <Header $isScrolled={isScrolled}>
            <Logo to="/">MyCloth</Logo>
            
            <DesktopNav>
                <NavLink to="/#footer" onClick={handleScrollToFooter}>Tentang</NavLink>
                <NavLink to="/produk">Produk</NavLink>
                <NavLink to="/#footer" onClick={handleScrollToFooter}>Kontak</NavLink>
            </DesktopNav>

            <MobileMenuIcon onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <CloseOutlined style={{ fontSize: '24px', color: '#641632' }} /> : <MenuOutlined style={{ fontSize: '24px', color: '#641632' }} />}
            </MobileMenuIcon>

            <MobileMenu open={isMobileMenuOpen}>
                <NavLink to="/#footer" onClick={handleScrollToFooter}>Tentang</NavLink>
                <NavLink to="/produk" onClick={() => handleNavigate('/produk')}>Produk</NavLink>
                <NavLink to="/#footer" onClick={handleScrollToFooter}>Kontak</NavLink>
            </MobileMenu>
        </Header>
    );
};

export default Navbar;