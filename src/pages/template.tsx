import Layout from '@components/Layout';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import SEO from '@components/SEO';

interface Props {
  pageContext: {
    frontmatter: {
      title: string;
      slug: string;
      date: string;
      image: string;
    };
    body: string;
  };
}

const PostTemplate = ({ pageContext: { frontmatter, body } }: Props) => {
  const { title, slug, date, image } = frontmatter;
  return (
    <Layout>
      <SEO title={title} description={slug} image={image} article={true} />
      <div>
        <h1>{title}</h1>
        <p>{new Date(date).toLocaleDateString()}</p>
      </div>
      <div>
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    </Layout>
  );
};

export default PostTemplate;
