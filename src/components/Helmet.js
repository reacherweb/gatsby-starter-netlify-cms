import React from 'react'
import { Helmet } from 'react-helmet'
import './all.sass'
import { withPrefix } from 'gatsby'

const _Helmet = () => {
  return (
    <Helmet>
      <html lang="en" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      <link
        rel="preconnect"
        href="https://fonts.gstatic.com/"
        crossOrigin="true"
      />
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Barlow:wght@200;400;600;700&display=block"
        crossOrigin="true"
        as="style"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Barlow:wght@200;400;600;700&display=block"
        crossOrigin="true"
      />
    </Helmet>
  )
}

export default _Helmet
