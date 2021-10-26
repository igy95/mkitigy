import { graphql, useStaticQuery } from 'gatsby';

import React from 'react';
import { colors } from '@constants';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { site } = useStaticQuery(query);
  const { author, social } = site.siteMetadata;

  return (
    <Container>
      <Top />
      <main>{children}</main>
      <Footer>
        <a href={social.github}>{author}</a>
        <Copyright>©</Copyright>
        {new Date().getFullYear()}
      </Footer>
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
  font-size: 0.9rem;
  text-align: center;
  margin-top: auto;
  padding: 3rem 0 2.5rem 0;
`;

const Copyright = styled.span`
  color: ${colors.grey400};
  margin: 0 0.2rem;
`;

export default Layout;

const query = graphql`
  query Footer {
    site {
      siteMetadata {
        author
        social {
          github
        }
      }
    }
  }
`;
