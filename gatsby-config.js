const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Mkitigy.io',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.resolve(__dirname, 'static', 'posts'),
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md'],
      },
    },
  ],
};
