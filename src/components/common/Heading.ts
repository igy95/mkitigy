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
  font-weight: 600;
  margin: 1.5rem 0;
`;
