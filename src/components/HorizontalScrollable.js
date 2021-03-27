import React, { createRef } from 'react'
import debounce from 'lodash.debounce'
import ResizeObserver from 'resize-observer-polyfill'

const HorizontalScrollable = class extends React.Component {
  menu = React.createRef()

  constructor(props) {
    super(props)
    this.state = {
      scrollArrowLeft: false,
      scrollArrowRight: false,
    }
    this.debouncedResize = null
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll(ev) {
    const { target } = ev
    if (!target) return
    const { scrollWidth, scrollLeft, offsetWidth } = target
    this.setState({
      scrollArrowRight: scrollWidth - (scrollLeft + offsetWidth) > 50,
    })
    this.setState({ scrollArrowLeft: scrollLeft > 50 })
  }

  onWindowResized = (setTrackStyle) => {
    if (this.debouncedResize) this.debouncedResize.cancel()
    this.debouncedResize = debounce(() => this.resizeWindow(setTrackStyle), 50)
    this.debouncedResize()
  }
  resizeWindow = (setTrackStyle = true) => {
    this.handleScroll({ target: this.menu.current })
  }

  componentDidMount() {
    if (this.menu.current) {
      this.menu.current.addEventListener('scroll', this.handleScroll, true)

      this.ro = new ResizeObserver(() => {
        if (this.state.animating) {
          this.onWindowResized(false)
          this.callbackTimers.push(
            setTimeout(() => this.onWindowResized(), this.props.speed)
          )
        } else {
          this.onWindowResized()
        }
      })
      this.ro.observe(this.menu.current)

      setTimeout(() => {
        this.handleScroll({ target: this.menu.current })
      }, 500)
    }
  }

  componentWillUnmount() {
    if (this.menu.current)
      this.menu.current.removeEventListener('scroll', this.handleScroll)
    this.ro.disconnect()
  }

  render() {
    const arrowStyle = {
      width: 35,
      height: '100%',
      zIndex: 1,
      color: 'white',
      position: 'absolute',
      padding: '8px 0',
      boxSizing: 'border-box',
      opacity: 0,
      transition: 'all 0.3s ease',
      pointerEvents: 'none',
    }

    return (
      <div {...this.props} style={{ position: 'relative' }}>
        <svg
          style={{
            ...arrowStyle,
            left: 0,
            opacity: this.state.scrollArrowLeft ? 0.7 : 0,
          }}
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 512"
        >
          <path
            fill="currentColor"
            d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
          ></path>
        </svg>

        <div className="horizontal-scrollable-list" ref={this.menu}>
          {this.props.children}
        </div>

        <svg
          style={{
            ...arrowStyle,
            right: 0,
            opacity: this.state.scrollArrowRight ? 0.7 : 0,
          }}
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 512"
        >
          <path
            fill="currentColor"
            d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
          ></path>
        </svg>
      </div>
    )
  }
}

export default HorizontalScrollable
