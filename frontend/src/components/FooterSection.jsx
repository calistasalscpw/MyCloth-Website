import React from "react";
import styled from "styled-components";
import { FacebookOutlined, InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Divider } from "antd";

// --- Styled Components ---

const FooterContainer = styled.footer`
  background: #641632;
  color: #ffffff;
  padding: 1.5rem;
  font-family: 'Poppins', sans-serif;
`;

const Container = styled.div`
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const Heading = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
`;

const Text = styled.p`
  color: #E393A7;
  line-height: 1.6;
`;

const Link = styled.a`
  color: #E393A7;
  display: block;
  margin-bottom: 0.5rem;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #FFFFFF;
  }
`;

const SocialLink = styled.a`
  color: #E393A7;
  transition: color 0.2s;
  margin-right: 0.5rem;

  &:hover {
    color: #FFFFFF;
  }
`;

const FooterSection = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "Produk", href: "#produk" },
        { name: "Kontak", href: "#footer" },
        { name: "Tentang Kami", href: "#footer" },
    ];

    const socialLinks = [
        { icon: InstagramOutlined, href: "https://www.instagram.com/gita_mycloth", label: "Instagram" },
        { icon: FacebookOutlined, href: "#", label: "Facebook" },
        { icon: WhatsAppOutlined, href: "#", label: "WhatsApp" },
    ];

    return(
        <FooterContainer id="footer">
            <Container>
                <Grid>
                    <div>
                        <Heading>MyCloth</Heading>
                        <Text>MyCloth adalah toko pilihan untuk gamis, daster, baju anak, dan lainnya di Bogor Timur. Kami berkomitmen menyediakan baju branded murah dan berkualitas untuk kepuasan pelanggan.</Text>
                    </div>
                    <div>
                        <h4>Navigasi</h4>
                        <div>
                            {quickLinks.map((link, index) => (
                                <Link key={index} href={link.href}>{link.name}</Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4>Ikuti Kami</h4>
                        {socialLinks.map((social, index) => (
                            <SocialLink key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                                <social.icon style={{fontSize: '24px'}} />
                            </SocialLink>
                        ))}
                    </div>
                </Grid>
                <div>
                    <Divider style={{background: '#E393A7'}}/>
                    <div style={{color: '#E393A7', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                        <span>© {currentYear} MyCloth. All rights reserved.</span>
                    </div>
                </div>
            </Container>
        </FooterContainer>
    )
}

export default FooterSection;