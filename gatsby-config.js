module.exports = {
  siteMetadata: {
    siteUrl: `https://www.rainiero.com`,
    title: `Life Hack Engineer`,
    description: `人生を楽しむエンジニアのブログ。技術や組織の話など書いてます。`,
    author: `rayyyy`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/pages/blog`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-"
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: 'UA-113551104-2'
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.published_date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.path,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.path,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___published_date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { path }
                      frontmatter {
                        title
                        published_date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Life Hack Engineer RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }

            allSitePage {
              nodes {
                path
              }
            }
        }`,
        resolveSiteUrl: ({ site }) => {
          return site.siteMetadata.siteUrl
        },
        serialize: ({ site, allSitePage }) =>
          allSitePage.nodes.map(node => {
            let priority = 0.7
            // トップページは優先度高め
            if (node.path === '/') {
              priority = 1.0
            }
            return {
              url: `${site.siteMetadata.siteUrl}${node.path}`,
              changefreq: `daily`,
              priority: priority,
            }
          })
      }
    },
  ],
}
