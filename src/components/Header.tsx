import { H1 } from './Heading/Heading';
import { Link } from 'gatsby';
import { PATH } from '@constants';
import React from 'react';

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <header>
      <Link to={PATH.HOME}>
        <H1>{title}</H1>
      </Link>
    </header>
  );
};

export default Header;
