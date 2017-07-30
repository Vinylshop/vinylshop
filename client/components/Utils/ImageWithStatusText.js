import React from 'react'

class ImageWithStatusText extends React.Component {
  constructor (props) {
    super(props)
    this.state = {imageStatus: 'Loading'}
  }

  handleImageLoaded () {
    this.setState({imageStatus: 'Loaded'})
  }

  handleImageErrored () {
    this.setState({imageStatus: 'Image Unavailable'})
  }

  render () {
    return (
      <div>
        <img
          src={this.props.imageUrl}
          height={this.props.height}
          width={this.props.width}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
        />
        <br />
        {this.state.imageStatus === 'Loading' ? this.state.imageStatus : null}
      </div>
    )
  }
}
export default ImageWithStatusText