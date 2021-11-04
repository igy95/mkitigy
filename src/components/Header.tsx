import { H1, H2 } from './common/Heading';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { PATH, colors } from '@constants';

import React from 'react';
import styled from '@emotion/styled';

interface Props {
  page: 'home' | 'post';
}

const Header = ({ page }: Props) => {
  const { site } = useStaticQuery(query);

  return (
    <Container>
      <Link to={PATH.HOME}>
        {page === 'home' ? (
          <H1>{site.siteMetadata.title}</H1>
        ) : (
          <H2>{site.siteMetadata.title}</H2>
        )}
      </Link>
    </Container>
  );
};

const Container = styled.header`
  border-top: 1rem solid ${colors.blue600};
`;

export default Header;

const query = graphql`
  query Site {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
