import React, { useEffect } from 'react'
import { startup } from '../utils'

export default (Component) => (props) => {
  const iframe = document.querySelector('#nc-root iframe')
  const iframeHeadElem = iframe && iframe.contentDocument.head

  if (!iframeHeadElem) {
    return null
  }

  useEffect(() => {
    if (window && !window.onload) {
      startup(iframe.contentDocument)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <head>
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
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@200;300;400;500;600;700&display=block"
          crossOrigin="true"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@200;300;400;500;600;700&display=block"
          crossOrigin="true"
        />
      </head>

      <Component {...props} />
    </>
  )
}
