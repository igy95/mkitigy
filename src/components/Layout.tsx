import { graphql, useStaticQuery } from 'gatsby';

import Header from './Header';
import React from 'react';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

interface SiteQueryData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const Layout = ({ children }: Props) => {
  const { site } = useStaticQuery<SiteQueryData>(query);

  return (
    <Container>
      <Header title={site.siteMetadata.title} />
      <main>{children}</main>
      <Footer>mkitigy © {new Date().getFullYear()}</Footer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 676px;
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

const query = graphql`
  query SiteQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
