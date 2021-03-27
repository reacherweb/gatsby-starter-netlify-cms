module.exports = {
  siteMetadata: {
    title: '基督教樂傳生命堂',
    description: '',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        indentedSyntax: true,
        postCssPlugins: [
          require(`postcss-preset-env`)({
            stage: 2,
            browsers: '> 0.5%, last 2 versions, ie 7',
            features: {
              'nesting-rules': true,
            },
          }),
          require(`postcss-node-sass`)(),
          require(`autoprefixer`)(),
        ],
        sassOptions: {
          precision: 6,
        },
      },
    },
    'gatsby-plugin-svgr',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-breakpoints',
      options: {
        queries: {
          smallMobile: '(max-width: 462px)',
          mobile: '(max-width: 959px)',
          portrait: '(orientation: portrait)',
        },
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms-paths`,
      options: {
        cmsConfig: `/static/admin/config.yml`,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
