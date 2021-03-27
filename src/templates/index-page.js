import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'
import AutofitImage from '../components/AutofitImage'

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { heroImage } = frontmatter

  return (
    <Layout
      style={{
        marginTop: 'auto',
      }}
    >
      <AutofitImage image={heroImage} useImg />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        heroImage {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              transformOptions: { fit: COVER }
              quality: 50
              breakpoints: [750, 1080, 1366, 1920]
            )
          }
        }
      }
    }
  }
`
