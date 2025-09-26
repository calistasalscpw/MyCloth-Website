import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  Layout,
  Checkbox,
  Card,
  Typography,
  Pagination,
  Input,
  Button,
  Select,
  Drawer,
  Row,
  Col,
} from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { dummyData } from "../dummy-data";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// --- Helper Function ---
const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

// --- Styled Components ---
const StyledCheckboxGroup = styled(Checkbox.Group)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .ant-checkbox-wrapper {
    font-size: 16px;
    font-family: "Poppins", sans-serif;
  }

  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-checked:hover .ant-checkbox-inner {
    background-color: #e63b7a;
    border-color: #e63b7a;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: #e63b7a;
  }
`;

const StyledPagination = styled(Pagination)`
  .ant-pagination-item-active {
    background-color: #e63b7a;
    border-color: #e63b7a;

    a {
      color: white;
    }
  }

  .ant-pagination-item:hover {
    border-color: #e63b7a;
    a {
      color: #641632;
    }
  }

  .ant-pagination-prev:hover .ant-pagination-item-link,
  .ant-pagination-next:hover .ant-pagination-item-link {
    border-color: #e63b7a;
    color: #e63b7a;
  }
`;

const PageContainer = styled(Layout)`
  padding: 100px 2rem 2rem 2rem;
  background: #fffcfd;
  max-width: 100%;
  margin: 0 auto;
`;

const StyledSider = styled(Sider)`
  background: #fffcfd !important;
  padding: 1rem;
  border-right: 1px solid #f0f0f0;

  @media (max-width: 991px) {
    display: none; /* hide sidebar on tablet & mobile */
  }
`;

const MobileMenuButton = styled(Button)`
  display: none;
  margin-bottom: 1rem;
  @media (max-width: 991px) {
    display: inline-block;
  }
`;

const MainContent = styled(Content)`
  padding-left: 2rem;
  @media (max-width: 991px) {
    padding-left: 0;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }
`;

const ProductCard = styled(Card)`
  border-radius: 16px;
  border: 1px solid #d8d9e0;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border: 1px solid #d8d9e0;
  }
`;

const ImageContainer = styled.div`
  height: 260px;
  position: relative;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
  ${({ $isSoldOut }) =>
    $isSoldOut &&
    css`
      filter: grayscale(100%);
    `}
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

const CardContent = styled.div`
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
  font-family: "Poppins", sans-serif;
  ${({ $isSoldOut }) =>
    $isSoldOut
      ? css`
          color: #aaaaaa;
          text-decoration: line-through;
        `
      : css`
          color: #e63b7a;
        `}
`;

const PaginationContainer = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

const FilterContainer = styled.div`
  margin-bottom: 2rem;
`;

// --- Component ---
const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerVisible, setDrawerVisible] = useState(false);

  // --- State from URL ---
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "9", 10);
  const searchQuery = searchParams.get("search") || "";
  const categoriesParam = searchParams.get("categories");
  const selectedCategories = categoriesParam ? categoriesParam.split("-") : [];
  const minPrice = parseInt(searchParams.get("minPrice") || "0", 10);
  const maxPrice = parseInt(searchParams.get("maxPrice") || "999999999", 10);
  const sortOrder = searchParams.get("sort") || "";

  const allCategories = [...new Set(dummyData.map((p) => p.category))];

  // --- Event Handlers ---
  const handleCategoryChange = (checkedValues) => {
    const newParams = new URLSearchParams(searchParams);
    if (checkedValues.length > 0) {
      newParams.set("categories", checkedValues.join("-"));
    } else {
      newParams.delete("categories");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleSearch = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage, newPageSize) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    newParams.set("pageSize", newPageSize);
    setSearchParams(newParams);
  };

  const handlePriceChange = (field, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (field === "min") newParams.set("minPrice", value || "0");
    if (field === "max") newParams.set("maxPrice", value || "999999999");
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleSortChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("sort", value);
    } else {
      newParams.delete("sort");
    }
    setSearchParams(newParams);
  };

  // --- Filtering Logic ---
  let filteredProducts = dummyData
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (product) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)
    )
    .filter((product) => product.price >= minPrice && product.price <= maxPrice);

  // --- Sorting Logic ---
  if (sortOrder === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // --- Pagination Logic ---
  const indexOfLastProduct = page * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // --- Sidebar Content ---
  const sidebarContent = (
    <>
      <Title level={4}>Saring</Title>
      <Title level={5}>Kategori</Title>
      <StyledCheckboxGroup
        options={allCategories}
        value={selectedCategories}
        onChange={handleCategoryChange}
      />

      <Title level={5} style={{ marginTop: "1.5rem" }}>
        Rentang Harga
      </Title>
      <Row gutter={8}>
        <Col span={12}>
          <Input
            prefix="Rp"
            type="number"
            min={0}
            defaultValue={minPrice}
            onBlur={(e) => handlePriceChange("min", e.target.value)}
          />
        </Col>
        <Col span={12}>
          <Input
            prefix="Rp"
            type="number"
            min={0}
            defaultValue={maxPrice === 999999999 ? "" : maxPrice}
            onBlur={(e) => handlePriceChange("max", e.target.value)}
          />
        </Col>
      </Row>

      <Title level={5} style={{ marginTop: "1.5rem" }}>
        Urutkan
      </Title>
      <Select
        style={{ width: "100%" }}
        placeholder="Pilih urutan harga"
        value={sortOrder || undefined}
        onChange={handleSortChange}
        allowClear
      >
        <Option value="asc">Harga Terendah</Option>
        <Option value="desc">Harga Tertinggi</Option>
      </Select>
    </>
  );

  return (
    <PageContainer>

      {/* Desktop Sidebar */}
      <StyledSider width={250}>{sidebarContent}</StyledSider>

      {/* Drawer for Mobile/Tablet */}
      <Drawer
        title="Filter"
        placement="left"
        closable
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={250}
      >
        {sidebarContent}
      </Drawer>

      {/* Main Content */}
      <MainContent>
        <FilterContainer>
            <Row gutter={8}>
                {/* Filter button (only visible on mobile/tablet) */}
                <Col xs={6} sm={4} md={3} lg={0}>
                <MobileMenuButton
                    icon={<MenuOutlined style={{ marginRight: "5px"}}/>}
                    onClick={() => setDrawerVisible(true)}
                    block
                    style={{ height: "48px", padding: "0.5rem" }}
                >
                    Filter
                </MobileMenuButton>
                </Col>

                {/* Search bar + button */}
                <Col xs={18} sm={20} md={21} lg={24}>
                <Input.Group compact style={{ display: "flex" }}>
                    <Input
                        style={{
                            flex: 1,
                            height: "48px",
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "16px",
                            borderColor: "#E63B7A"
                        }}
                        placeholder="Cari nama produk..."
                        defaultValue={searchQuery}
                        onPressEnter={(e) => handleSearch(e.target.value)}
                        allowClear
                    />
                    <Button
                    type="primary"
                    style={{
                        background: "linear-gradient(to right, #E63B7A, #E393A7)",
                        border: "none",
                        height: "48px",
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "16px",
                    }}
                    onClick={() =>
                        handleSearch(document.querySelector("input").value)
                    }
                    >
                        Cari
                    </Button>
                </Input.Group>
                </Col>
            </Row>
        </FilterContainer>


        <ProductGrid>
          {currentProducts.map((item) => (
            <Link to={`/produk/${item.id}`} key={item.id}>
              <ProductCard
                hoverable
                cover={
                  <ImageContainer>
                    <ProductImage
                      alt={item.name}
                      src={item.photos[0]}
                      $isSoldOut={item.isSoldOut}
                    />
                    {item.isSoldOut && <SoldOutBadge>Stok Habis</SoldOutBadge>}
                  </ImageContainer>
                }
                bodyStyle={{ padding: 0 }}
              >
                <CardContent>
                  <Title
                    level={5}
                    style={{
                      marginBottom: "0.25rem",
                      fontWeight: "600",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {item.name}
                  </Title>
                  <Description type="secondary">{item.description}</Description>
                  <Price $isSoldOut={item.isSoldOut}>
                    {formatPrice(item.price)}
                  </Price>
                </CardContent>
              </ProductCard>
            </Link>
          ))}
        </ProductGrid>

        <PaginationContainer>
          <StyledPagination
            current={page}
            total={filteredProducts.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={["6", "9", "12"]}
          />
        </PaginationContainer>
      </MainContent>
    </PageContainer>
  );
};

export default Product;
