import Highlight, { Language, defaultProps } from 'prism-react-renderer';

import React from 'react';
import { colors } from '@constants';
import styled from '@emotion/styled';
import theme from 'prism-react-renderer/themes/nightOwl';

interface Props {
  children: {
    props: {
      children: string;
      className: string;
    };
  };
}

const CodeBlock = (props: Props) => {
  const { children, className } = props.children.props;
  const language = (className.replace(/language-/, '') || '') as Language;

  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            padding: '1.5rem',
            borderRadius: '10px',
            boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px',
            marginBottom: '1.5rem',
          }}
        >
          {tokens.map((line, i) => (
            <CodeLine key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </CodeLine>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const CodeLine = styled.div`
  margin: 0.3rem 0;

  & > span {
    color: ${colors.grey300};
  }
`;

export default CodeBlock;
