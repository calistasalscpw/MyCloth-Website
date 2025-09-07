import React, {useState, useRef} from "react";
import { Card, Typography, Button } from "antd";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const ProductSection = () => {
    const { Title, Text } = Typography;
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const scrollRef = useRef(null);
    
    const dummyData = [
        {
            name: "Baju gamis",
            description: "Katun jepang bermotif bunga sakura",
            price: 100000,
            size: ["M"],
            category: ["Gamis", "Wanita"],
            photos: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=405&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            isSoldOut: false
        },
        {
            name: "Baju koko",
            description: "Tersedia dengan tujuh warna",
            price: 70000,
            size: ["L"],
            category: ["Muslim", "Pria"],
            photos: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=411&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            isSoldOut: true
        },
        {
            name: "Baju anak",
            description: "Katun yang tersedia dalam warna biru dan pink.",
            price: 80000,
            size: ["M"],
            category: ["Unisex", "Anak"],
            photos: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            isSoldOut: false
        },
        {
            name: "Daster Rumahan",
            description: "Nyaman dipakai seharian di rumah.",
            price: 55000,
            photos: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            isSoldOut: false
        },
        {
            name: "Jaket Bomber Pria",
            description: "Bahan kanvas, cocok untuk berkendara.",
            price: 150000,
            photos: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=436&auto=format&fit=crop",
            isSoldOut: false
        },
        {
            name: "Blazer Merah Wanita",
            description: "Tampil formal dan elegan.",
            price: 250000,
            photos: "https://images.unsplash.com/photo-1579298245158-3de3fe48537b?q=80&w=1887&auto=format&fit=crop",
            isSoldOut: false
        },
        {
            name: "Kemeja Pantai Pria",
            description: "Bahan rayon, adem dan nyaman.",
            price: 95000,
            photos: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1928&auto=format&fit=crop",
            isSoldOut: false
        },
        {
            name: "Sweater Rajut",
            description: "Hangat dan stylish untuk cuaca dingin.",
            price: 120000,
            photos: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=405&auto=format&fit=crop",
            isSoldOut: false
        }
    ]

    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const sectionStyle = {
        padding: '3rem 0',
        background: '#FFFCFD',
        fontFamily: "'Poppins', sans-serif",
        position: 'relative'
    };

    const titleStyle = {
        color: '#E63B7A',
        textAlign: 'center',
        marginBottom: '3rem',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 'bold'
    };

    const scrollContainerStyle = {
        display: 'flex',
        overflowX: 'auto',
        padding: '0 1.5rem 1.5rem 1.5rem', // Add padding for content and scrollbar space
        maxWidth: '1200px',
        margin: '0 auto',
        // Hide scrollbar for a cleaner look
        scrollbarWidth: 'none', // For Firefox
    };

    const gridWrapperStyle = {
        display: 'flex',
        gap: '2rem',
    };

    const cardStyle = {
        borderRadius: '16px', // Rounded corners
        border: '1px solid #D8D9E0',
        overflow: 'hidden', // Ensures the image corners are also rounded
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        flex: '0 0 240px',
        display: 'flex', 
        flexDirection: 'column'
    };

    
    const imageContainerStyle = {
        height: '300px',
        position: 'relative', // Needed for the "sold out" badge
        overflow: 'hidden'
    };

    const soldOutBadgeStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '8px',
        fontWeight: 'bold',
        zIndex: 1
    };
    
    const contentStyle = {
        padding: '1rem',
        textAlign: 'left',
        fontFamily: "'Poppins', sans-serif",
        flexGrow: 1, // This is the key change!
        display: 'flex',
        flexDirection: 'column'
    };

    const descriptionStyle = {
        marginBottom: '0.75rem',
        flexGrow: 1, // Allows the description to take up available space
        display: '-webkit-box',
        WebkitLineClamp: 2, // Limit to 2 lines
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minHeight: '40px' // Reserve space for 2 lines of text
    };

    // Helper function to format the price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    // Button style and sold out states

    const buttonStyle = {
        borderRadius: '20px',
        borderColor: '#E63B7A',
        color: isButtonHovered ? 'white' : '#E63B7A',
        backgroundColor: isButtonHovered ? '#E63B7A' : 'transparent',
        fontWeight: '500',
        transition: 'all 0.3s ease'
    };
    
    const getImageStyle = (isSoldOut) => ({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'filter 0.3s ease',
        filter: isSoldOut ? 'grayscale(100%)' : 'none' // Apply grayscale filter if sold out
    });

    const getPriceStyle = (isSoldOut) => ({
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: isSoldOut ? '#AAAAAA' : '#E63B7A',
        textDecoration: isSoldOut ? 'line-through' : 'none',
        fontFamily: "'Poppins', sans-serif",
    });

    const scrollButtonStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid #E63B7A',
        color: '#E63B7A',
    };

    return(
        <div style={sectionStyle}>
            {/* Added a simple style to hide scrollbar in Webkit browsers (Chrome, Safari) */}
            <style>{`.scroll-container::-webkit-scrollbar { display: none; } .scroll-button { display: none; } @media (min-width: 1024px) { .scroll-button { display: inline-flex; }}`}</style>


            <Title style={titleStyle}>PRODUK TERBARU</Title>

            <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
                <Button 
                    className="scroll-button"
                    shape="circle" 
                    icon={<LeftOutlined />} 
                    style={{ ...scrollButtonStyle, left: 0 }}
                    onClick={() => handleScroll('left')}
                />
                <div ref={scrollRef} style={scrollContainerStyle} className="scroll-container">
                    <div style={gridWrapperStyle}>
                        {dummyData.map((item, index) => (
                            <Card
                                key={index}
                                hoverable
                                style={cardStyle}
                                cover={
                                    <div style={imageContainerStyle}>
                                        <img alt={item.name} src={item.photos} style={getImageStyle(item.isSoldOut)}/>
                                        {item.isSoldOut && (
                                            <div style={soldOutBadgeStyle}>
                                                Stok Habis
                                            </div>
                                        )}
                                    </div>
                                }
                                bodyStyle={{ padding: 0 }}
                            >
                                <div style={contentStyle}>
                                    <Title level={5} style={{ marginBottom: '0.25rem', fontWeight: '600', fontFamily: "'Poppins', sans-serif", }}>
                                        {item.name}
                                    </Title>
                                    <Text type="secondary" style={descriptionStyle}>
                                        {item.description}
                                    </Text>
                                    <Text style={getPriceStyle(item.isSoldOut)}>
                                        {formatPrice(item.price)}
                                    </Text>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
                <Button 
                    className="scroll-button"
                    shape="circle" 
                    icon={<RightOutlined />} 
                    style={{ ...scrollButtonStyle, right: 0 }}
                    onClick={() => handleScroll('right')}
                />
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <Button
                    type="default"
                    size="large"
                    style={buttonStyle}
                    onMouseEnter={() => isButtonHovered(true)}
                    onMouseLeave={() => isButtonHovered(false)}
                >
                    Lihat selengkapnya
                </Button>
            </div>
        </div>
    )
}

export default ProductSection;