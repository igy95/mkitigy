import { graphql, useStaticQuery } from 'gatsby';

import Layout from '@components/Layout';
import MarkdownContent from '@components/MarkdownContent';
import React from 'react';
import SEO from '@components/SEO';
import { colors } from '@constants';
import styled from '@emotion/styled';

const About = () => {
  const { mdx } = useStaticQuery(query);
  const { frontmatter, body } = mdx;

  return (
    <Layout>
      <SEO title="About" description="mkitigy Resume" />
      <Date>
        <i>Last Updated - {frontmatter.date}</i>
      </Date>
      <MarkdownContent>{body}</MarkdownContent>
    </Layout>
  );
};

const Date = styled.div`
  margin: 2rem 0;
  text-align: right;

  & > i {
    color: ${colors.grey500};
  }
`;

export default About;

const query = graphql`
  query About {
    mdx(frontmatter: { title: { eq: "about" } }) {
      frontmatter {
        date
      }
      body
    }
  }
`;
