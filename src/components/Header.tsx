import { Link, graphql, useStaticQuery } from 'gatsby';

import { H1 } from './common/Heading';
import { PATH } from '@constants';
import React from 'react';

const Header = () => {
  const { site } = useStaticQuery(query);

  return (
    <header>
      <Link to={PATH.HOME}>
        <H1>{site.siteMetadata.title}</H1>
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
