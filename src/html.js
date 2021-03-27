import React from 'react'
import PropTypes from 'prop-types'
import useSiteMetadata from './components/SiteMetadata'
import { withPrefix } from 'gatsby'

export default function HTML(props) {
  const { title, description } = useSiteMetadata()

  return (
    <html {...props.htmlAttributes} style={{ overflowY: 'hidden', opacity: 0 }}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <title>基督教樂傳生命堂</title>

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin="true"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@200;300;400;500;600;700&display=block"
          crossOrigin="true"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@200;300;400;500;600;700&display=block"
          crossOrigin="true"
        />

        <meta property="og:type" content="business.business" />
        <meta property="og:site_name" content="基督教樂傳生命堂" />
        <meta property="og:title" content="基督教樂傳生命堂" />
        <meta property="og:description" content="" />
        <meta name="description" content="" />
        <meta property="og:url" content="http://www.reacher.org.hk/" />
        <meta name="theme-color" content="#fff" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}/img/logo-1.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}/img/logo-1.png`}
          sizes="32x32"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}/img/logo-1.png`}
          color="#000000"
        />

        <meta property="og:image" href={`${withPrefix('/')}/img/logo-1.png`} />

        <meta name="twitter:title" content="基督教樂傳生命堂" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" href={`${withPrefix('/')}/img/logo-1.png`} />
        <meta name="twitter:image:alt" content="基督教樂傳生命堂" />
        <meta name="twitter:card" content="summary_large_image" />

        {props.headComponents}
      </head>
      <body
        {...props.bodyAttributes}
        style={{ overflowY: 'hidden', opacity: 0 }}
      >
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
