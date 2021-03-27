import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.png'
import HorizontalScrollable from './HorizontalScrollable'
import window from 'global'


const pages = [
  ['首頁', '/'],
  ['本堂簡介', '/about'],
  ['分享', '#'],
  ['講道重溫', '#'],
  ['教會聚會', '#'],
  ['2020行事曆', '#'],
  ['聯絡我們', '#'],
  ['友好連結', '#'],
]

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const pathname = window.location.pathname
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-logo" title="Logo">
              <img src={logo} alt="Reacher Church" />
            </Link>
          </div>
          <HorizontalScrollable className="navbar-menu">
            {pages.map(([title, url], index) => (
              <Link
                key={index}
                className={
                  'navbar-item' +
                  ((url.length > 1 && pathname.startsWith(url)) ||
                  url == pathname
                    ? ' active'
                    : '')
                }
                to={url}
              >
                {title}
              </Link>
            ))}
          </HorizontalScrollable>
        </div>
      </nav>
    )
  }
}

export default Navbar
