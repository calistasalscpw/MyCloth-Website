import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
// import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const { Title, Text, Link } = Typography;

const FormContainer = styled.div`
  background-color: #FFFFFF;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(to right, #E63B7A, #FFDCE3);
  border: none;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    background: linear-gradient(to right, #E63B7A, #FFDCE3);
    opacity: 0.9;
  }
`;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
//   const { login } = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await login(values);
    } catch (error) {
      // Error is already handled in AuthContext, but you could add more here if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2} style={{ color: '#E63B7A' }}>Selamat Datang Kembali!</Title>
        <Text type="secondary">Stock MyCloth menunggumu!.</Text>
      </div>
      <Form name="login" onFinish={onFinish} layout="vertical" size="large">
        <Form.Item name="email" rules={[{ required: true, type: 'email', message: "Please input a valid email!" }]}>
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <StyledButton type="primary" htmlType="submit" loading={loading} block>
            Login
          </StyledButton>
        </Form.Item>
        <Text type="secondary" style={{ textAlign: 'center', display: 'block' }}>
          Don't have an account? <Link href="/auth/signup" style={{ color: '#E63B7A'}}>Sign up here!</Link>
        </Text>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;