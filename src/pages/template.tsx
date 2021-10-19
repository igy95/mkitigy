import Layout from '@components/Layout';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';

interface Props {
  pageContext: {
    frontmatter: {
      title: string;
      date: string;
    };
    body: string;
  };
}

const PostTemplate = ({ pageContext: { frontmatter, body } }: Props) => {
  return (
    <Layout>
      <div>
        <h1>{frontmatter.title}</h1>
        <p>{new Date(frontmatter.date).toLocaleDateString()}</p>
      </div>
      <div>
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    </Layout>
  );
};

export default PostTemplate;
