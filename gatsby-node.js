/** src/pages의 컴포넌트를 가져와 md 파일을 주입해 post page 빌드 */
const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@constants': path.resolve(__dirname, 'src/constants'),
      },
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const query = await graphql(`
    query Posts {
      allMdx(filter: { fileAbsolutePath: { regex: "/posts/" } }) {
        edges {
          node {
            id
            frontmatter {
              title
              slug
              date
              featuredImage
            }
            body
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

  posts.forEach((post) => {
    const { frontmatter, body } = post.node;
    const path = `/post/${frontmatter.title.trim().replace(/\s+/g, '-')}`;

    actions.createPage({
      path,
      component: postTemplate,
      context: {
        frontmatter,
        body,
      },
    });
  });
};
