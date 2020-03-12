import axios from 'axios'

const GOT_ENTRY = 'GOT_ENTRY'

const initialState = {}

const gotEntry = entry => ({type: GOT_ENTRY, entry})

export const getEntry = (day, month, year) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/entries/${month}/${day}/${year}`)
    dispatch(gotEntry(data))
  } catch (error) {
    console.log(error)
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ENTRY:
      return action.entry
    default:
      return state
  }
}

export default reducer
