import { FacebookOutlined, InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import React from "react";

const FooterSection = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "Produk", href: "#produk" },
        { name: "Kontak", href: "#footer" },
        { name: "Tentang Kami", href: "#footer" },
    ];

    // TODO: UPDATE SOCIAL INFO 
    const socialLinks = [
        {
        icon: InstagramOutlined,
        href: "https://www.instagram.com/gita_mycloth",
        label: "Instagram"
        },
        {
        icon: FacebookOutlined,
        href: "#",
        label: "Facebook"
        },
        {
        icon: WhatsAppOutlined,
        href: "#",
        label: "WhatsApp"
        }
    ];

    // --- Style Objects for Cleaner Code ---
    const footerStyle = {
        background: '#641632', 
        color: '#ffffff',
        padding: '1.5rem 1.5rem', 
        fontFamily: "'Poppins', sans-serif"
    };

    const containerStyle = {
        // maxWidth: '100vh',
        margin: '0 auto' // Center the content
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Responsive grid
        gap: '3rem'
    };

    const headingStyle = {
        fontSize: '1.5rem',
        marginBottom: '1rem',
        fontFamily: "'Playfair Display', serif"
    };

    const textStyle = {
        color: '#E393A7',
        lineHeight: '1.6'
    };

    const linkStyle = {
        color: '#E393A7',
        display: 'block', 
        marginBottom: '0.5rem',
        textDecoration: 'none',
        transition: 'color 0.2s'
    };
    
    // We can add a hover effect directly in the component for simplicity
    const handleLinkMouseOver = (e) => e.target.style.color = '#FFFFFF';
    const handleLinkMouseOut = (e) => e.target.style.color = '#E393A7';

    return(
        <footer style={footerStyle} id="footer">
            <div style={containerStyle}>
                <div style={gridStyle}>
                    {/* Column About MyCloth */}
                    <div>
                        <h4 style={headingStyle}>MyCloth</h4>
                        <p style={textStyle}>MyCloth adalah toko pilihan untuk gamis, daster, baju anak, dan lainnya di Bogor Timur. Kami berkomitmen menyediakan baju branded murah dan berkualitas untuk kepuasan pelanggan.</p>
                    </div>
                    {/* Column Navigasi */}
                    <div>
                        <h4>Navigasi</h4>
                        <div>
                            {quickLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    style={linkStyle}
                                    onMouseOver={handleLinkMouseOver}
                                    onMouseOut={handleLinkMouseOut}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    {/* Column Follow Us */}
                    <div>
                        <h4>Ikuti Kami</h4>
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                style={{color: '#E393A7', transition: 'color 0.2s', marginRight: '0.5rem'}}
                                onMouseOver={handleLinkMouseOver}
                                onMouseOut={handleLinkMouseOut}
                            >
                                <social.icon style={{fontSize: '24px'}} />
                            </a>
                        ))}
                    </div>
                </div>
                <div>
                    <Divider style={{background: '#E393A7'}}/>
                    <div style={{color: '#E393A7', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                        <span>© {currentYear} MyCloth. All rights reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default FooterSection;