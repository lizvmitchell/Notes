import React from 'react'
import {connect} from 'react-redux'
import {getEntry} from '../store/entry'

class Entry extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getEntry(id)
  }

  render() {
    const {entry} = this.props
    return (
      <div>
        <h2>
          {entry.month} {entry.day}, {entry.year}
        </h2>
        <h3>{entry.title}</h3>
        <article>{entry.body}</article>
      </div>
    )
  }
}

const mapState = state => ({entry: state.entry.entry})

const mapDispatch = dispatch => ({
  getEntry: id => dispatch(getEntry(id))
})

export default connect(mapState, mapDispatch)(Entry)
