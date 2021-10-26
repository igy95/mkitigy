import { colors } from '@constants';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const headingStyle = css`
  color: ${colors.grey800};
`;

export const H1 = styled.h1`
  ${headingStyle}
  font-weight: 900;
`;

export const H2 = styled.h2`
  ${headingStyle}
  font-weight: 700;
  margin: 1.5rem 0;
`;

export const H3 = styled.h3`
  ${headingStyle}
  margin: 1.5rem 0;
`;

export const H4 = styled.h4`
  ${headingStyle}
  margin: 1.5rem 0;
`;

export const H5 = styled.h5`
  ${headingStyle}
  margin: 1.5rem 0;
`;
