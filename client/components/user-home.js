import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getEntries} from '../store/entry'
import ArrowButton from './arrowButton'

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
    this.handleArrowClick = this.handleArrowClick.bind(this)
  }
  componentDidMount() {
    const date = new Date()
    const idx = date.getMonth()
    const year = date.getFullYear()
    const month = months[idx]
    this.setState({month: month, year: year})
    this.props.getEntries(month, year)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.month !== this.state.month) {
      this.props.getEntries(this.state.month, this.state.year)
    }
  }

  handleArrowClick(event) {
    if (event.target.value === 'left') {
      if (this.state.month === 'January') {
        this.setState(state => {
          return {year: state.year - 1, month: 'December'}
        })
      } else {
        let idx = months.indexOf(this.state.month)
        idx--
        let month = months[idx]
        this.setState({month: month})
      }
    }
    if (event.target.value === 'right') {
      if (this.state.month === 'December') {
        this.setState(state => {
          return {year: state.year + 1, month: 'January'}
        })
      } else {
        let idx = months.indexOf(this.state.month)
        idx++
        let month = months[idx]
        this.setState({month: month})
      }
    }
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    return (
      <div>
        <h3>Welcome, {this.props.email}</h3>
        <br />
        <div>
          <ArrowButton
            text="<"
            handleClick={this.handleArrowClick}
            dir="left"
          />
          <h4>{this.state.month}</h4>
          <ArrowButton
            text=">"
            handleClick={this.handleArrowClick}
            dir="right"
          />
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
