import { graphql, useStaticQuery } from 'gatsby';

import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { colors } from '@constants';
import styled from '@emotion/styled';

const Bio = () => {
  const { site } = useStaticQuery(query);
  const { author, introduction, social } = site.siteMetadata;

  return (
    <Container>
      <ImageWrapper>
        <StaticImage
          src="../images/profile.jpg"
          alt={author}
          placeholder="blurred"
          layout="fixed"
          width={100}
          height={100}
          style={{
            borderRadius: '50%',
          }}
        />
      </ImageWrapper>
      <TextContent>
        <Author>
          DevLog by <strong>{author}</strong>
        </Author>
        <Introduction>{introduction}</Introduction>
        {social && (
          <MoreInfo>
            <li>
              <a href="/">Resume</a>
            </li>
            <li>
              <a href={social.github}>Github</a>
            </li>
            <li>
              <a href={social.gmail}>Contact</a>
            </li>
          </MoreInfo>
        )}
      </TextContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 6rem;
  padding: 1rem;
  margin-bottom: 3rem;
`;

const ImageWrapper = styled.div`
  margin-right: 1rem;
`;

const TextContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 1rem;
`;

const Author = styled.span`
  font-weight: 500;
`;

const Introduction = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${colors.grey700};
`;

const MoreInfo = styled.ul`
  display: flex;

  & > li {
    font-size: 0.85rem;
    width: max-content;
    margin-right: 0.7rem;
    border-bottom: 1px solid;
  }
`;

export default Bio;

const query = graphql`
  query Bio {
    site {
      siteMetadata {
        author
        introduction
        social {
          github
          gmail
        }
      }
    }
  }
`;
