import React from 'react'

const arrowButton = props => {
  return (
    <React.Fragment>
      <button
        id="month-arrow"
        type="button"
        value={props.dir}
        onClick={props.handleClick}
      >
        {props.text}
      </button>
    </React.Fragment>
  )
}

export default arrowButton
