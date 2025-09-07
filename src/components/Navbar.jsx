import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    // --- Event Listener for Scroll Effect ---
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // --- Navigation Handlers ---
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

    // --- Style Objects ---
    const navbarStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease',
        ...(isScrolled && {
            backgroundColor: 'rgba(255, 233, 238, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
        })
    };
    
    const logoStyle = {
        color: '#E63B7A',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        fontFamily: "'Playfair Display', serif",
        textDecoration: 'none'
    };
    
    const navLinksStyle = {
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
    };

    const navLinkStyle = {
        color: '#641632',
        textDecoration: 'none',
        fontWeight: '500',
        fontFamily: "'Poppins', sans-serif",
        position: 'relative',
        paddingBottom: '4px'
    };
    
    return (
        <header style={navbarStyle}>
            <Link to="/" style={logoStyle}>MyCloth</Link>
            
            {/* Desktop Navigation */}
            <nav style={navLinksStyle} className="desktop-nav">
                <a href="#footer" onClick={handleScrollToFooter} style={navLinkStyle}>Tentang</a>
                <Link to="/produk" style={navLinkStyle}>Produk</Link>
                <a href="#footer" onClick={handleScrollToFooter} style={navLinkStyle}>Kontak</a>
            </nav>

            {/* Mobile Menu Icon */}
            <div className="mobile-menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <CloseOutlined style={{ fontSize: '24px', color: '#641632' }} /> : <MenuOutlined style={{ fontSize: '24px', color: '#641632' }} />}
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <a href="#footer" onClick={handleScrollToFooter}>Tentang</a>
                <Link to="/produk" onClick={() => handleNavigate('/produk')}>Produk</Link>
                <a href="#footer" onClick={handleScrollToFooter}>Kontak</a>
            </div>
            
            {/* --- CSS for Mobile Responsiveness --- */}
            <style>{`
                .desktop-nav {
                    display: flex;
                }
                .mobile-menu-icon {
                    display: none;
                    cursor: pointer;
                }
                .mobile-menu {
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
                    transform: translateY(-150%);
                    transition: transform 0.3s ease-in-out;
                    opacity: 0;
                }
                .mobile-menu.open {
                    transform: translateY(0);
                    opacity: 1;
                }
                .mobile-menu a {
                    padding: 1rem;
                    color: #641632;
                    text-decoration: none;
                    font-weight: 500;
                    width: 100%;
                    text-align: center;
                }

                @media (max-width: 768px) {
                    .desktop-nav {
                        display: none;
                    }
                    .mobile-menu-icon {
                        display: block;
                    }
                }
            `}</style>
        </header>
    );
};

export default Navbar;

