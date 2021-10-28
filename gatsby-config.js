const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Mkitigy.io',
    titleTemplate: '%s | Mkitigy.io',
    description: 'Personal blog posting about frontend develop.',
    url: '',
    image: '',
    author: `mkitigy`,
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
        name: 'contents',
        path: `${__dirname}/src/contents`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 600,
            },
          },
        ],
      },
    },
  ],
};
