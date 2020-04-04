import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
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
  constructor(props) {
    super(props)

    this.state = {
      month: '',
      year: ''
    }
  }
  componentDidMount() {
    const date = new Date()
    const idx = date.getMonth()
    const year = date.getFullYear()
    const month = months[idx]
    this.setState({month: month, year: year})
    this.props.getEntries(month, year)
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    return (
      <div>
        <h3>Welcome, {this.props.email}</h3>
        <br />
        <div>
          <button type="button">{`<`}</button>
          <h4>{this.state.month}</h4>
          <button type="button">{`>`}</button>
        </div>
        {this.props.entries.map(entry => (
          <div key={entry.id}>
            <Link to={`/entry/${entry.id}`}>
              <h4>{entry.title}</h4>
            </Link>
            <p>{entry.body}</p>
          </div>
        ))}
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
    getEntries: (month, year) => dispatch(getEntries(month, year))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
