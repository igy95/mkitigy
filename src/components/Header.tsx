import { H1, H2 } from './common/Heading';
import { Link, graphql, useStaticQuery } from 'gatsby';

import { PATH } from '@constants';
import React from 'react';

interface Props {
  page: 'home' | 'post';
}

const Header = ({ page }: Props) => {
  const { site } = useStaticQuery(query);

  return (
    <header>
      <Link to={PATH.HOME}>
        {page === 'home' ? (
          <H1>{site.siteMetadata.title}</H1>
        ) : (
          <H2>{site.siteMetadata.title}</H2>
        )}
      </Link>
    </header>
  );
};

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
