import React from 'react'
import { Link } from 'gatsby'
import { getNodeText } from '../utils'
export default class StyledLink extends React.Component {
  render() {
    const { to, children, newTab, className } = this.props
    const content = <span data-hover={getNodeText(children)}>{children}</span>
    const colonIndex = to.indexOf(':')
    if (colonIndex > 0) {
      const action = colonIndex > 0 && to.substring(0, colonIndex)
      const external = action === 'https' || action === 'http'
      if (
        action === 'mailto' ||
        action === 'tel' ||
        action === 'fax' ||
        action === 'callto' ||
        external
      ) {
        return (
          <a
            className={className || 'text-link'}
            href={to}
            target={((newTab || external) && '_blank') || undefined}
          >
            {content}
          </a>
        )
      }
    }

    return <Link to={to}>{content}</Link>
  }
}

StyledLink.defaultProps = {}
