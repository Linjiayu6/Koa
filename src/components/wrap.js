import React, { PropTypes } from 'react'

function Wrap(props) {
  return <div>{props.children}</div>
}

Wrap.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Wrap
