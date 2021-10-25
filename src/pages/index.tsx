import { Link, graphql, useStaticQuery } from 'gatsby';

import Bio from '@components/Bio';
import Layout from '@components/Layout';
import { PATH } from '@constants';
import React from 'react';
import SEO from '@components/SEO';

interface PostsQueryData {
  allMdx: {
    edges: {
      node: {
        frontmatter: {
          title: string;
          date: string;
        };
      };
    }[];
  };
}

const App = () => {
  const { allMdx } = useStaticQuery<PostsQueryData>(query);

  return (
    <Layout>
      <SEO title="Home" description="home page for blog." />
      <Bio />
      {allMdx.edges.map((edge, index) => {
        const { date, title } = edge.node.frontmatter;
        const path = `${PATH.POST}/${title.trim().replace(/\s+/g, '-')}`;

        return (
          <Link to={path} key={index}>
            {title} - {date}
          </Link>
        );
      })}
    </Layout>
  );
};

export default App;

const query = graphql`
  query Posts {
    allMdx(filter: { fileAbsolutePath: { regex: "/posts/" } }) {
      edges {
        node {
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
`;
