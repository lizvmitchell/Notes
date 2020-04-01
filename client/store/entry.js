import axios from 'axios'

const initialState = {
  entries: [],
  entry: {}
}

const GOT_ENTRY = 'GOT_ENTRY'

const gotEntry = entry => ({type: GOT_ENTRY, entry})

export const getEntry = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/entries/${id}`)
    dispatch(gotEntry(data))
  } catch (error) {
    console.log(error)
  }
}

const GOT_ENTRIES = 'GOT_ENTRIES'

const gotEntries = entries => ({type: GOT_ENTRIES, entries})

export const getEntries = month => async dispatch => {
  try {
    const {data} = await axios.get(`/api/entries/?month=${month}`)
    dispatch(gotEntries(data))
  } catch (error) {
    console.log(error)
  }
}

// const CREATED_ENTRY = 'CREATED_ENTRY'

// const createdEntry = entry => ({type: CREATED_ENTRY, entry})

export const createEntry = entry => async dispatch => {
  try {
    const {data} = await axios.post('/api/entries', entry)
    dispatch(gotEntry(data))
  } catch (error) {
    console.log(error)
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ENTRY:
      return {...state, entry: action.entry}
    case GOT_ENTRIES:
      return {...state, entries: action.entries}
    default:
      return state
  }
}

export default reducer
