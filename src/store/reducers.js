import { combineReducers } from 'redux'
import {
  REQUEST_USERS,
  RECEIVE_USERS,
  REQUEST_SINGLE_USER,
  RECEIVE_SINGLE_USER
} from './actions'

function users(state = { isFetching: false, items: [] },  action ) {
  switch (action.type) {
    case REQUEST_USERS:
    case REQUEST_SINGLE_USER:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USERS:
      return Object.assign({}, state, {
        isFetching: false,
        users: action.users,
        pages: action.users ? Math.ceil(action.users.length/10) : 1,
      })
    case RECEIVE_SINGLE_USER:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user
      })
    default:
      return state
  }
}

function reducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
    case REQUEST_USERS:
      return Object.assign({}, state, {
        users: users(state.users, action)
      })
    case RECEIVE_SINGLE_USER:
      return Object.assign({}, state, {
        user: users(state, action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  reducer
})

export default rootReducer
