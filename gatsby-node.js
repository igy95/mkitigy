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
              date
              title
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
  const postTemplate = path.resolve(__dirname, 'src/pages', 'template.tsx');

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
