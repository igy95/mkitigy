import { GatsbyImage, ImageDataLike, getImage } from 'gatsby-plugin-image';
import { PATH, colors } from '@constants';

import Bio from '@components/Bio';
import { H1 } from '@components/common/Heading';
import Header from '@components/Header';
import Layout from '@components/Layout';
import { Link } from 'gatsby';
import MarkdownContent from '@components/MarkdownContent';
import React from 'react';
import SEO from '@components/SEO';
import { formatDate } from '@utils';
import styled from '@emotion/styled';

interface OtherArticle {
  frontmatter: {
    title: string;
  };
}

interface Props {
  pageContext: {
    frontmatter: {
      date: Date;
      description: string;
      imgSrc: string;
      title: string;
      featuredImage: ImageDataLike;
    };
    body: string;
    timeToRead: number;
    next: OtherArticle;
    previous: OtherArticle;
  };
}

const PostTemplate = ({
  pageContext: { frontmatter, body, timeToRead, next, previous },
}: Props) => {
  if (!frontmatter) return null;
  const { title, description, date, featuredImage, imgSrc } = frontmatter;
  const image = getImage(featuredImage);

  return (
    <Layout>
      <SEO title={title} description={description} article={true} />
      <Header page="post" />
      <Post>
        <FrontMatter>
          <Title>{title}</Title>
          <ReadInfo>
            {formatDate(date)} • {timeToRead} min
          </ReadInfo>
          {image && <FeaturedImage image={image} alt={title} />}
          {imgSrc && (
            <ImageSource>
              <a href={imgSrc}>이미지 출처</a>
            </ImageSource>
          )}
        </FrontMatter>
        <MarkdownContent>{body}</MarkdownContent>
      </Post>
      <Navigator>
        <li>
          {previous && (
            <Link to={PATH.POST(previous.frontmatter.title)}>
              이전 글: {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={PATH.POST(next.frontmatter.title)}>
              다음 글: {next.frontmatter.title}
            </Link>
          )}
        </li>
      </Navigator>
      <Bio />
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

const ReadInfo = styled.i`
  color: ${colors.grey500};
`;

const FeaturedImage = styled(GatsbyImage)`
  margin-top: 2.5rem;
`;

const ImageSource = styled.div`
  margin-top: 0.7rem;
  width: 37.5rem;
  text-align: right;

  & > a {
    color: ${colors.grey500};
  }
`;

const Navigator = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;

  & > li {
    width: 45%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & a {
    color: ${colors.red400};
  }

  & > li:last-child {
    text-align: right;
  }
`;

export default PostTemplate;
