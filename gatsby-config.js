const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Mkitigy.io',
    titleTemplate: '%s · mkitigy',
    description: 'Personal blog posting about frontend develop.',
    url: '',
    image: '',
    author: `@mkitigy`,
    twitterUsername: '',
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
    {
      plugins: [`gatsby-plugin-react-helmet`],
    },
  ],
};
