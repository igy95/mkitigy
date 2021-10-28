import { Link, graphql, useStaticQuery } from 'gatsby';

import Bio from '@components/Bio';
import { H2 } from '@components/common/Heading';
import Header from '@components/Header';
import Layout from '@components/Layout';
import React from 'react';
import SEO from '@components/SEO';
import { colors } from '@constants';
import styled from '@emotion/styled';

interface PostsQueryData {
  allMdx: {
    edges: {
      node: {
        slug: string;
        timeToRead: number;
        frontmatter: {
          date: Date;
          description: string;
          tags: string[];
          title: string;
        };
      };
    }[];
  };
}

const App = () => {
  const { allMdx } = useStaticQuery<PostsQueryData>(query);

  return (
    <Layout>
      <Header page="home" />
      <SEO title="Home" description="home page for blog." />
      <Bio />
      <PostList>
        {allMdx.edges.map((edge, index) => {
          const { slug, timeToRead, frontmatter } = edge.node;
          const { date, description, title } = frontmatter;

          return (
            <Post key={title + date}>
              <Link to={slug} key={index}>
                <Title>{title}</Title>
                <Description>{description}</Description>
                <ReadInfo>
                  <small>
                    {date} • {timeToRead} min
                  </small>
                </ReadInfo>
              </Link>
            </Post>
          );
        })}
      </PostList>
    </Layout>
  );
};

const PostList = styled.ul`
  padding: 1.2rem;
`;

const Post = styled.li`
  margin-bottom: 3rem;
  transition: all 0.2s ease;

  &:hover {
    filter: drop-shadow(0 0 0.1rem #b0b8c1);
  }
`;

const Title = styled(H2)`
  margin-bottom: 0.8rem;
`;

const Description = styled.div`
  margin-bottom: 1.2rem;
`;

const ReadInfo = styled.div`
  color: ${colors.grey600};
  text-align: right;
`;

export default App;

const query = graphql`
  query Posts {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          slug
          timeToRead
          frontmatter {
            date
            description
            tags
            title
          }
        }
      }
    }
  }
`;
