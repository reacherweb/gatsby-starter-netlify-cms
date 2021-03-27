export const globals = {
  cssVariables: {},
}

export function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num
}

export function max(x, y) {
  return y > x ? y : x
}

export function min(x, y) {
  return y < x ? y : x
}

export const getNodeText = (node) => {
  if (['string', 'number'].includes(typeof node)) return node
  if (node instanceof Array) return node.map(getNodeText).join('')
  if (typeof node === 'object' && node) return getNodeText(node.props.children)
}

//Returns true if it is a DOM node
export function isNode(o) {
  return typeof Node === 'object'
    ? o instanceof Node
    : o &&
        typeof o === 'object' &&
        typeof o.nodeType === 'number' &&
        typeof o.nodeName === 'string'
}

//Returns true if it is a DOM element
export function isElement(o) {
  return typeof HTMLElement === 'object'
    ? o instanceof HTMLElement //DOM2
    : o &&
        typeof o === 'object' &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === 'string'
}

// Where el is the DOM element you'd like to test for visibility
function isHidden(el) {
  if (el.offsetParent === null) return true
  while (el.parentElement) {
    el = el.parentElement
    if (el.tagName == 'BODY') return false
    if (el.offsetParent === null) return true
  }
  return false
}

export const styleVariables = {}
export function setStyleVariableIfExists(selector, name, getter, _document) {
  if (!_document) _document = document

  const elems = isElement(selector)
    ? [selector]
    : _document.querySelectorAll(selector)
  if (!elems.length) return

  for (let i = 0; i < elems.length; i++) {
    if (isHidden(elems[i])) continue

    const value = `${getter(elems[i])}`

    styleVariables[name] = value
    globals.cssVariables[name] = value

    _document.documentElement.style.setProperty('--' + name, value)

    break
  }
}

export function getCoords(elem, _document) {
  if (!_document) _document = document

  // crossbrowser version
  var box = elem.getBoundingClientRect()

  var body = _document.body
  var docEl = _document.documentElement

  var scrollTop =
    (window.document === _document && window.pageYOffset) ||
    docEl.scrollTop ||
    body.scrollTop
  var scrollLeft =
    (window.document === _document && window.pageXOffset) ||
    docEl.scrollLeft ||
    body.scrollLeft

  var clientTop = docEl.clientTop || body.clientTop || 0
  var clientLeft = docEl.clientLeft || body.clientLeft || 0

  var top = box.top + scrollTop - clientTop
  var left = box.left + scrollLeft - clientLeft

  return {
    height: box.height,
    width: box.width,
    x: Math.round(left),
    y: Math.round(top),
  }
}

export function update_vh(_document) {
  if (!_document) _document = document
  let height =
    window.document === _document
      ? window.innerHeight
      : _document.documentElement.clientHeight
  let width =
    window.document === _document
      ? window.innerWidth
      : _document.documentElement.clientWidth
  let vh = height * 0.01
  let vw = width * 0.01
  let dr = _document.documentElement.getBoundingClientRect()
  let dh = dr.height
  let dw = dr.width
  _document.documentElement.style.setProperty('--dh', `${dh}px`)
  _document.documentElement.style.setProperty('--dw', `${dw}px`)
  _document.documentElement.style.setProperty('--vh', `${vh}px`)
  _document.documentElement.style.setProperty('--vw', `${vw}px`)
  _document.documentElement.style.setProperty('--vh_', `${vh}`)
  _document.documentElement.style.setProperty('--vw_', `${vw}`)
  _document.documentElement.style.setProperty('--window-height', `${height}px`)
  _document.documentElement.style.setProperty('--window-width', `${width}px`)
  _document.documentElement.style.setProperty('--window-height-', `${height}`)
  _document.documentElement.style.setProperty('--window-width-', `${width}`)
  const bodyScoll = _document.body.scrollTop

  _document.body.scrollTop = bodyScoll
}

export function onWindowResize(func, _window) {
  _window = _window || window
  if (_window.attachEvent) {
    _window.attachEvent('onresize', func)
  } else if (_window.addEventListener) {
    _window.addEventListener('resize', func, true)
  }
}

export function startup(_document) {
  if (!_document) _document = document
  const binded_update_vh = update_vh.bind(null, _document)
  console.log('loaded', { _document })

  const iframe = document.querySelector('iframe')

  onWindowResize(binded_update_vh)

  window.update_vh = binded_update_vh
  update_vh(_document)
  setTimeout(binded_update_vh, 30)
  setTimeout(binded_update_vh, 60)
  setTimeout(() => {
    _document.body.style.opacity = 1
    _document.body.style.overflowY = ''
    _document.documentElement.style.opacity = 1
    _document.documentElement.style.overflowY = ''
  }, 60)
  // if (_document !== window.document)
  //   setInterval(binded_update_vh, 1000);
  if (iframe) onWindowResize(binded_update_vh, iframe.contentWindow)
}
