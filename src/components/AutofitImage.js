import React from 'react'
import { omit } from 'lodash'
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image'

export default class AutofitImage extends React.Component {
  render() {
    var bgSize = this.props.imgSize
    if (!(['cover', 'contain'].indexOf(bgSize) > -1)) bgSize = 'cover'
    if (this.props.keepOriginalImgSize) bgSize = 'auto'
    var positionX = this.props.positionX
    if (!(['left', 'center', 'right'].indexOf(positionX) > -1))
      positionX = 'center'
    var positionY = this.props.positionY
    if (!(['top', 'center', 'bottom'].indexOf(positionY) > -1))
      positionY = 'center'

    const _image = this.props.image
    const useImg = this.props.useImg

    let image, imgSrc, gatsbyImage

    if (typeof _image === 'string') {
      image = null
      imgSrc = _image
    } else {
      image = _image
      imgSrc = this.props.imgSrc || (image && getSrc(image))
    }

    if (useImg)
      gatsbyImage = image && (
        <GatsbyImage image={getImage(image)} alt={this.props.alt || 'image'} />
      )

    var style = {
      width: this.props.frameWidth,
      height: this.props.frameHeight,
      maxWidth: this.props.maxFrameWidth,
      maxHeight: this.props.maxFrameHeight,
      minWidth: this.props.minFrameWidth,
      minHeight: this.props.minFrameHeight,
      backgroundImage: !useImg && imgSrc && 'url(' + imgSrc + ')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: positionX + ' ' + positionY,
      backgroundSize: bgSize,
      display: 'flex',
      ...this.props.style,
    }
    return (
      <div
        {...omit(this.props, [
          'useImg',
          'image',
          'imgSrc',
          'positionX',
          'positionY',
          'keepOriginalImgSize',
          'imgSize',
          'frameWidth',
          'frameHeight',
          'maxFrameWidth',
          'maxFrameHeight',
          'minFrameWidth',
          'minFrameHeight',
        ])}
        style={style}
      >
        {gatsbyImage}
      </div>
    )
  }
}
AutofitImage.defaultProps = {
  keepOriginalImgSize: false,
  useImg: false,
  imgSize: 'cover',
  frameWidth: '100%',
  frameHeight: '100%',
  maxFrameWidth: '100%',
  maxFrameHeight: '100%',
  minFrameWidth: '100%',
  minFrameHeight: '100%',
  positionX: 'center',
  positionY: 'center',
}
