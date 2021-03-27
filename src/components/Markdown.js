import { omit } from 'lodash'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import StyledLink from './StyledLink'

const renderers = {
  link: ({ children, href }) => {
    return <StyledLink to={href}>{children}</StyledLink>
  },
}

export default class Markdown extends React.Component {
  render() {
    const { children } = this.props
    if (typeof children !== 'string')
      throw new Error('children must of a string')

    return (
      <ReactMarkdown {...omit(this.props, ['children'])} renderers={renderers}>
        {children.replace(/([^ ]?)\n/g, '$1  \n')}
      </ReactMarkdown>
    )
  }
}

Markdown.defaultProps = {}
