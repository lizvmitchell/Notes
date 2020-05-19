import React from 'react'
import {connect} from 'react-redux'
import {createEntry} from '../store/entry'

class NewEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    let entry = {...this.state}
    await this.props.createEntry(entry)
    this.setState({
      title: '',
      body: ''
    })
    this.props.history.push('/home')
  }

  render() {
    return (
      <div id="entry-form-container">
        <form onSubmit={this.handleSubmit}>
          <div id="entry-title-input-container">
            <label className="entry-label" htmlFor="title">
              Title:
            </label>
            <input
              id="title-input-field"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div id="entry-content-input-container">
            <label className="entry-label" htmlFor="body">
              Content:
            </label>
            <textarea
              id="entry-input-field"
              name="body"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Post</button>
        </form>
      </div>
    )
  }
}

// const mapState = state => ({entry: state.entry})

const mapDispatch = dispatch => ({
  createEntry: entry => dispatch(createEntry(entry))
})

export default connect(null, mapDispatch)(NewEntry)
