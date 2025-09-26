import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Row, Col, Typography, Button, Tag, Divider, Breadcrumb } from 'antd';
import { HomeOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { dummyData } from '../dummy-data';

const { Title, Text, Paragraph } = Typography;

// --- Helper Function ---
const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
};

// --- Styled Components ---
const DetailContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 120px 2rem 2rem 2rem;
  background: #FFFCFD;
`;

const ImageGalleryCol = styled(Col)``;
const ProductInfoCol = styled(Col)``;

const MainImageWrapper = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  margin-bottom: 1rem;
`;

const MainImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  transition: filter 0.3s ease;
  ${({ $isSoldOut }) => $isSoldOut && css`filter: grayscale(100%);`}
`;

const SoldOutBadge = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.2rem;
  z-index: 1;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid ${({ active }) => (active ? '#E63B7A' : '#f0f0f0')};
  transition: border-color 0.3s ease, filter 0.3s ease;
  ${({ $isSoldOut }) => $isSoldOut && css`filter: grayscale(100%);`}
  &:hover {
    border-color: #E63B7A;
  }
`;

const CategoryText = styled(Text)`
    color: #E63B7A;
    font-weight: 600;
    text-transform: uppercase;
`;

const PriceText = styled(Title)`
    color: #E63B7A !important;
    margin-top: 1rem !important;
`;

const SizeTag = styled(Tag)`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 8px;
`;

const PesanButton = styled(Button)`
    background: #25D366;
    color: white !important;
    border-color: #25D366 !important;
    height: 50px;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 2rem;
    
    &:hover {
        background: #128C7E !important;
    }
`;

const StyledBreadcrumb = styled(Breadcrumb)`
    margin-bottom: 2rem;
`;

const ProductDetail = () => {
    const { productId } = useParams();
    const product = dummyData.find(p => p.id === productId);

    const [selectedImage, setSelectedImage] = useState(product ? product.photos[0] : null);

    if (!product) {
        return <DetailContainer><Title level={2}>Produk tidak ditemukan</Title></DetailContainer>;
    }

    const handlePesanSekarang = () => {
        const message = encodeURIComponent(`Halo, saya tertarik dengan produk "${product.name}". Apakah masih tersedia?`);
        // Replace with your WhatsApp number
        const whatsappUrl = `https://wa.me/6281234567890?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <DetailContainer>
             <StyledBreadcrumb>
                <Breadcrumb.Item>
                    <Link to="/"><HomeOutlined /></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/produk">Produk</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
            </StyledBreadcrumb>
            <Row gutter={[32, 32]}>
                <ImageGalleryCol xs={18} md={8}>
                    <MainImageWrapper>
                        <MainImage src={selectedImage} alt={product.name} $isSoldOut={product.isSoldOut} />
                        {product.isSoldOut && <SoldOutBadge>Stok Habis</SoldOutBadge>}
                    </MainImageWrapper>
                    <ThumbnailContainer>
                        {product.photos.map((photo, index) => (
                            <Thumbnail
                                key={index}
                                src={photo}
                                alt={`${product.name} thumbnail ${index + 1}`}
                                active={selectedImage === photo}
                                onClick={() => setSelectedImage(photo)}
                                $isSoldOut={product.isSoldOut}
                            />
                        ))}
                    </ThumbnailContainer>
                </ImageGalleryCol>
                <ProductInfoCol xs={24} md={12}>
                    <CategoryText>{product.category}</CategoryText>
                    <Title level={1} style={{ marginTop: '0.5rem' }}>{product.name}</Title>
                    <PriceText level={2}>{formatPrice(product.price)}</PriceText>
                    
                    <Divider/>

                    <Title level={5}>Ukuran Tersedia:</Title>
                    <div>
                        {product.size.map(s => <SizeTag key={s}>{s}</SizeTag>)}
                    </div>

                    <Title level={5} style={{ marginTop: '2rem' }}>Deskripsi:</Title>
                    <Paragraph type="secondary">{product.description}</Paragraph>
                    
                    <PesanButton 
                        type="primary" 
                        size="large" 
                        icon={<WhatsAppOutlined />}
                        block
                        onClick={handlePesanSekarang}
                        disabled={product.isSoldOut}
                    >
                        Pesan Sekarang
                    </PesanButton>
                </ProductInfoCol>
            </Row>
        </DetailContainer>
    );
};

export default ProductDetail;