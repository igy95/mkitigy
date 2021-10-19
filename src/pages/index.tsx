import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '@components/Layout';
import { PATH } from '@constants';
import React from 'react';

interface Posts {
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
  const posts: Posts = useStaticQuery(graphql`
    query {
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
  `);

  return (
    <Layout>
      {posts.allMdx.edges.map((edge, index) => {
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
