import React, { useRef } from "react";
import styled, { css } from 'styled-components';
import { Card, Typography, Button } from "antd";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// --- Data ---
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
];

// --- Helper Function ---
const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
};


// --- Styled Components ---

const Section = styled.section`
  padding: 3rem 0;
  background: #FFFCFD;
  font-family: 'Poppins', sans-serif;
  position: relative;
`;

const SectionTitle = styled(Title)`
  color: #E63B7A !important;
  text-align: center;
  margin-bottom: 3rem !important;
  font-family: 'Poppins', sans-serif !important;
  font-weight: bold !important;
`;

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 0 1.5rem 1.5rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  scrollbar-width: none; /* For Firefox */
  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
`;

const GridWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const ProductCard = styled(Card)`
  border-radius: 16px;
  border: 1px solid #D8D9E0;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex: 0 0 240px;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  height: 300px;
  position: relative;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
  ${({ $isSoldOut }) => $isSoldOut && css`filter: grayscale(100%);`}
`;

const SoldOutBadge = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  z-index: 1;
`;

const Content = styled.div`
  padding: 1rem;
  text-align: left;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Description = styled(Text)`
  margin-bottom: 0.75rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 40px;
`;

const Price = styled(Text)`
  font-weight: bold;
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
  ${({ $isSoldOut }) =>
    $isSoldOut
      ? css`
          color: #AAAAAA;
          text-decoration: line-through;
        `
      : css`
          color: #E63B7A;
        `}
`;

const ScrollButton = styled(Button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #E63B7A;
  color: #E63B7A;
  display: none; /* Hidden by default */

  @media (min-width: 1024px) {
    display: inline-flex; /* Show on desktop */
  }

  ${({ direction }) => direction === 'left' ? 'left: 0;' : 'right: 0;'}
`;

const SeeMoreButton = styled(Button)`
  border-radius: 20px;
  border-color: #E63B7A;
  color: #E63B7A;
  background-color: transparent;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    color: white !important;
    background-color: #E63B7A !important;
    border-color: #E63B7A !important;
  }
`;


// --- Component ---

const ProductSection = () => {
    const scrollRef = useRef(null);
    
    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <Section>
            <SectionTitle>PRODUK TERBARU</SectionTitle>

            <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
                <ScrollButton 
                    shape="circle" 
                    icon={<LeftOutlined />} 
                    direction="left"
                    onClick={() => handleScroll('left')}
                />
                <ScrollContainer ref={scrollRef}>
                    <GridWrapper>
                        {dummyData.map((item, index) => (
                            <ProductCard
                                key={index}
                                hoverable
                                cover={
                                    <ImageContainer>
                                        <ProductImage alt={item.name} src={item.photos} $isSoldOut={item.isSoldOut} />
                                        {item.isSoldOut && (
                                            <SoldOutBadge>Stok Habis</SoldOutBadge>
                                        )}
                                    </ImageContainer>
                                }
                                bodyStyle={{ padding: 0 }}
                            >
                                <Content>
                                    <Title level={5} style={{ marginBottom: '0.25rem', fontWeight: '600', fontFamily: "'Poppins', sans-serif" }}>
                                        {item.name}
                                    </Title>
                                    <Description type="secondary">
                                        {item.description}
                                    </Description>
                                    <Price $isSoldOut={item.isSoldOut}>
                                        {formatPrice(item.price)}
                                    </Price>
                                </Content>
                            </ProductCard>
                        ))}
                    </GridWrapper>
                </ScrollContainer>
                <ScrollButton
                    shape="circle"
                    icon={<RightOutlined />}
                    direction="right"
                    onClick={() => handleScroll('right')}
                />
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <SeeMoreButton type="default" size="large">
                    Lihat selengkapnya
                </SeeMoreButton>
            </div>
        </Section>
    );
}

export default ProductSection;