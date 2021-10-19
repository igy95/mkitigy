import React from 'react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <Container>
    <main>{children}</main>
    <Footer>mkitigy © {new Date().getFullYear()}</Footer>
  </Container>
);

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 3.25rem;
`;

export default Layout;
