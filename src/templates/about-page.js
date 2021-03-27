import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import AutofitImage from '../components/AutofitImage'

const AboutPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { image } = frontmatter

  return (
    <Layout className="content-container">
      <AutofitImage style={{ margin: 'auto' }} image={image} useImg />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
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
