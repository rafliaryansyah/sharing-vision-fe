import React from 'react'
import PropTypes from 'prop-types'
// import icLoading from '../../assets/images/react.jpg'

const PageLoading = ({ visible }) => {
  return (
    <div className={`pageloading ${visible ? 'show' : 'hide'}`}>
      <div className="pageloading-content">
        {/* <img className="pageloading-image" src={icLoading} title="" alt="" /> */}
        {/* <span className="pageloading-text">Please Wait...</span> */}
      </div>
    </div>
  )
}

PageLoading.propTypes = {
  visible: PropTypes.bool,
}
PageLoading.defaultProps = {
  visible: false,
}

export default React.memo(PageLoading)
