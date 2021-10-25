import { graphql, useStaticQuery } from 'gatsby';

import Header from './Header';
import React from 'react';
import { colors } from '@constants';
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
      <Top />
      <Header title={site.siteMetadata.title} />
      <main>{children}</main>
      <Footer>mkitigy © {new Date().getFullYear()}</Footer>
    </Container>
  );
};

const Top = styled.div`
  background-color: ${colors.blue500};
  height: 1rem;
`;

const Container = styled.div`
  max-width: 676px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: auto;
  padding: 1rem 0;
`;

export default Layout;

const query = graphql`
  query Site {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
