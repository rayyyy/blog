import React from "react"
import { graphql } from "gatsby"

import Layout from "../../templates/layout/layout"
import PostDate from "../../components/organisms/post-date/post-date"
import Tags from "../../components/molecules/tags/tags"
import SEO from "../../components/organisms/seo"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} description={excerpt} />
      <h1>{frontmatter.title}</h1>
      <PostDate
        published_date={frontmatter.published_date}
        updated_date={frontmatter.updated_date}
      ></PostDate>
      <Tags tags={frontmatter.tags} />
      <div
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { path: { eq: $path } }) {
      html
      excerpt(pruneLength: 110, truncate: true)
      frontmatter {
        published_date(formatString: "YYYY年MM月DD日")
        updated_date(formatString: "YYYY年MM月DD日")
        title
        tags
      }
    }
  }
`