import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { PATH } from '../constants';

const App = () => {
  const posts = useStaticQuery(graphql`
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
    <div>
      {posts.allMdx.edges.map((edge, index) => {
        const { date, title } = edge.node.frontmatter;
        const path = `${PATH.POST}/${title.trim().replace(/\s+/g, '-')}`;

        return (
          <Link to={path} key={index}>
            {title} - {date}
          </Link>
        );
      })}
    </div>
  );
};

export default App;
