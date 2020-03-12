import React from 'react'
import {connect} from 'react-redux'
import {getEntry} from '../store/entry'

class Entry extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    console.log(this.props)
    return (
      <div>
        <h2>Date Goes Here</h2>
        <h3>Title Goes Here</h3>
        <article>
          An awful lot of text goes here. Just so so much. More than you want,
          really.
        </article>
      </div>
    )
  }
}

const mapState = state => ({entry: state.entry})

const mapDispatch = dispatch => ({
  getEntry: (month, day, year) => dispatch(getEntry(month, day, year))
})

export default connect(mapState, mapDispatch)(Entry)
