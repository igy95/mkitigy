import React from 'react';
import styled from '@emotion/styled';

const TYF = () => (
  <a
    href="https://thankyou-for.com/creator/mkitigy"
    target="_blank"
    rel="noreferrer"
  >
    <Image
      src="https://de56jrhz7aye2.cloudfront.net/banner/black.svg"
      alt="thank you for donation button"
    />
  </a>
);

const Image = styled.img`
  border: none;
  height: 2rem;
`;

export default TYF;
