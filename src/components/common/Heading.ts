import { colors } from '@constants';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const headingStyle = css`
  color: ${colors.grey900};
`;

export const H1 = styled.h1`
  ${headingStyle}
  font-weight: 900;
`;
