import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const PostTemplate = ({ pageContext: { frontmatter, body } }) => {
  return (
    <div>
      <div>
        <h1>{frontmatter.title}</h1>
        <p>{new Date(frontmatter.date).toLocaleDateString()}</p>
      </div>
      <div>
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    </div>
  );
};

export default PostTemplate;
