import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getEntries} from '../store/entry'

/**
 * COMPONENT
 */
// export const UserHome = props => {
//   const {email} = props

//   return (
//     <div>
//       <h3>Welcome, {email}</h3>
//     </div>
//   )
// }

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

class UserHome extends React.Component {
  componentDidMount() {
    const date = new Date()
    const idx = date.getMonth()
    const month = months[idx]
    this.props.getEntries({month: month})
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h3>Welcome, {this.props.email}</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    entries: state.entry.entries
  }
}

const mapDispatch = dispatch => {
  return {
    getEntries: entries => dispatch(getEntries(entries))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
