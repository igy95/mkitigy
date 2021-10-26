import { H1, H2, H3, H4, H5 } from './common/Heading';

import CodeBlock from './CodeBlock';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { colors } from '@constants';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  children: string & React.ReactNode;
}

const MarkdownContent = ({ children }: Props) => (
  <MDXProvider
    components={{
      p: Paragraph,
      h1: H1,
      h2: H2,
      h3: H3,
      h4: H4,
      h5: H5,
      blockquote: BlockQuote,
      inlineCode: InlineCode,
      a: Link,
      ul: UL,
      ol: OL,
      pre: CodeBlock,
    }}
  >
    <MDXRenderer>{children}</MDXRenderer>
  </MDXProvider>
);

const Paragraph = styled.p`
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const BlockQuote = styled.blockquote`
  background-color: ${colors.grey100};
  border-left: 10px solid ${colors.grey300};
  margin-bottom: 1.5rem;
  padding: 1rem;

  & > p {
    margin: 0;
  }
`;

const InlineCode = styled.code`
  background-color: ${colors.yellow50};
  color: ${colors.red400};
  border-radius: 4px;
  padding: 0.1rem 0.3rem;
`;

const Link = styled.a`
  color: ${colors.blue500};

  &::visited {
    color: inherit;
  }
`;

const List = css`
  margin-left: 0.5rem;
  margin-bottom: 1.5rem;

  & > li {
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }
`;

const UL = styled.ul`
  ${List}

  & > li {
    list-style: inside;
  }
`;

const OL = styled.ol`
  ${List}

  & > li {
    list-style: number inside;
  }
`;

export default MarkdownContent;
