/** src/pages의 컴포넌트를 가져와 md 파일을 주입해 post page 빌드 */
const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter!
    }
    type MdxFrontmatter {
      featuredImage: File @fileByRelativePath
      imgSrc: String
    }
  `);
};

exports.createPages = async ({ graphql, actions }) => {
  const query = await graphql(`
    query Posts {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/posts/" } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        edges {
          next {
            slug
            frontmatter {
              title
            }
          }
          previous {
            slug
            frontmatter {
              title
            }
          }
          node {
            body
            slug
            timeToRead
            frontmatter {
              date
              description
              imgSrc
              tags
              title
              featuredImage {
                childImageSharp {
                  gatsbyImageData(
                    width: 600
                    height: 300
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
          }
        }
      }
    }
  `);

  if (query.errors) {
    throw query.errors;
  }

  const posts = query.data.allMdx.edges;
  const postTemplate = path.resolve(__dirname, 'src/pages', 'post.tsx');

  posts.forEach(({ next, previous, node }) => {
    const { body, slug, timeToRead, frontmatter } = node;

    actions.createPage({
      path: slug,
      component: postTemplate,
      context: {
        frontmatter,
        body,
        timeToRead,
        next: previous,
        previous: next,
      },
    });
  });
};
