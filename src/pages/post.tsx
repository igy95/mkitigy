import Bio from '@components/Bio';
import Darass from 'darass-react';
import { H1 } from '@components/common/Heading';
import Header from '@components/Header';
import Layout from '@components/Layout';
import MarkdownContent from '@components/MarkdownContent';
import React from 'react';
import SEO from '@components/SEO';
import TYF from '@components/TYF';
import { colors } from '@constants';
import styled from '@emotion/styled';

interface Props {
  pageContext: {
    frontmatter: {
      title: string;
      slug: string;
      date: string;
      featuredImage: string;
    };
    body: string;
  };
}

const PostTemplate = ({ pageContext: { frontmatter, body } }: Props) => {
  const { title, slug, date, featuredImage } = frontmatter;

  return (
    <Layout>
      <SEO
        title={title}
        description={slug}
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

const Badge = styled.div`
  text-align: right;
`;

export default PostTemplate;
