import React from 'react'

const arrowButton = props => {
  return (
    <div>
      <button type="button" value={props.dir} onClick={props.handleClick}>
        {props.text}
      </button>
    </div>
  )
}

export default arrowButton
