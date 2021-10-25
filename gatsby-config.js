const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Mkitigy.io',
    titleTemplate: '%s · mkitigy',
    description: 'Personal blog posting about frontend develop.',
    url: '',
    image: '',
    author: `@mkitigy`,
    introduction: 'Love Music & Development',
    social: {
      github: 'https://github.com/GwangYeol-Im',
      gmail: 'mailto:mkitigy@gmail.com',
    },
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
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md'],
      },
    },
  ],
};
