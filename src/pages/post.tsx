import { PATH, colors } from '@constants';

import Bio from '@components/Bio';
import Darass from 'darass-react';
import { H1 } from '@components/common/Heading';
import Header from '@components/Header';
import Layout from '@components/Layout';
import { Link } from 'gatsby';
import MarkdownContent from '@components/MarkdownContent';
import React from 'react';
import SEO from '@components/SEO';
import TYF from '@components/TYF';
import styled from '@emotion/styled';

interface Props {
  pageContext: {
    frontmatter: {
      title: string;
      description: string;
      date: string;
      featuredImage: string;
    };
    body: string;
    nextPost: string;
    prevPost: string;
  };
}

const PostTemplate = ({
  pageContext: { frontmatter, body, nextPost, prevPost },
}: Props) => {
  const { title, description, date, featuredImage } = frontmatter;

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        image={featuredImage}
        article={true}
      />
      <Header page="post" />
      <Post>
        <FrontMatter>
          <Title>{title}</Title>
          <Date>{date}</Date>
        </FrontMatter>
        <MarkdownContent>{body}</MarkdownContent>
      </Post>
      <Navigator>
        <li>
          {prevPost && (
            <Link to={PATH.POST(prevPost)}>이전 글: {prevPost}</Link>
          )}
        </li>
        <li>
          {nextPost && (
            <Link to={PATH.POST(nextPost)}>다음 글: {nextPost}</Link>
          )}
        </li>
      </Navigator>
      <Badge>
        <TYF />
      </Badge>
      <Bio />
      <Darass
        projectKey="RX0tGvoJblfIKbR38"
        darkMode={false}
        primaryColor={colors.green300}
        isShowSortOption={true}
        isAllowSocialLogin={false}
        isShowLogo={false}
      />
    </Layout>
  );
};

const Post = styled.article`
  margin-bottom: 3rem;
`;

const FrontMatter = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
`;

const Title = styled(H1)`
  margin-top: 4rem;
  font-size: 2.3rem;
`;

const Date = styled.i`
  color: ${colors.grey500};
`;

const Navigator = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;

  & > li {
    width: 45%;
    color: ${colors.red300};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > li:last-child {
    text-align: right;
  }
`;

const Badge = styled.div`
  text-align: right;
`;

export default PostTemplate;
