import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Helmet from './Helmet'

const TemplateWrapper = ({ children, title, style, className, location }) => {
  return (
    <div className="body">
      <Helmet />
      <Navbar location={location} />
      <div style={style} className={className}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
