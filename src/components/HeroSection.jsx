import React from "react";

const HeroSection = () => {
    const heroStyles = {
        // --- Layout and Sizing ---
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',     
        minHeight: '100vh',
        
        // --- Background and Text ---
        background: 'linear-gradient(to bottom, #FFE9EE, #FFFCFD)',
        color: '#E63B7A',         
        textAlign: 'center',      
        padding: '2rem'           
    };

    const headingStyles = {
        fontFamily: "'Playfair Display', serif", 
        fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', // Responsive font size
        marginBottom: '1rem'
    };

    const subheadingStyles = {
        fontFamily: "'Poppins', sans-serif", // A clean font for the body text
        fontSize: 'clamp(1rem, 4vw, 1.25rem)',
        maxWidth: '600px', // Prevent text from getting too wide on large screens
        lineHeight: '1.6'
    };


    return(
        <div style={heroStyles}>
            <h1 style={headingStyles}>Your Tastes Are Here</h1>
            <p style={subheadingStyles}>Temukan koleksi pilihan gamis, batik, dan busana berkualitas untuk setiap momen spesial Anda.</p>
        </div>
    )
}

export default HeroSection;