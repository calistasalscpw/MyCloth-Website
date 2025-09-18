import React from "react";
import styled from "styled-components";

// --- Styled Components ---

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #FFE9EE, #FFFCFD);
  color: #E63B7A;
  text-align: center;
  padding: 2rem;
`;

const Heading = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 8vw, 4.5rem); // Responsive font size
  margin-bottom: 1rem;
`;

const Subheading = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1rem, 4vw, 1.25rem);
  max-width: 600px;
  line-height: 1.6;
`;


const HeroSection = () => {
    return (
        <HeroContainer>
            <Heading>Your Tastes Are Here</Heading>
            <Subheading>
                Temukan koleksi pilihan gamis, batik, dan busana berkualitas untuk setiap momen spesial Anda.
            </Subheading>
        </HeroContainer>
    );
}

export default HeroSection;