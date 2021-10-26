import { H1 } from '@components/common/Heading';
import Header from '@components/Header';
import Layout from '@components/Layout';
import MarkdownContent from '@components/MarkdownContent';
import React from 'react';
import SEO from '@components/SEO';
import { colors } from '@constants';
import styled from '@emotion/styled';

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
      <Header page="post" />
      <article>
        <FrontMatter>
          <Title>{title}</Title>
          <Date>{date}</Date>
        </FrontMatter>
        <MarkdownContent>{body}</MarkdownContent>
      </article>
    </Layout>
  );
};

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

export default PostTemplate;
