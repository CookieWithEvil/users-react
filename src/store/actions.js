export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const REQUEST_SINGLE_USER = 'REQUEST_SINGLE_USER'
export const RECEIVE_SINGLE_USER = 'RECEIVE_SINGLE_USER'


function requestUsers() {
  return {
    type: REQUEST_USERS,
  }
}

function receiveUsers(json) {
  return {
    type: RECEIVE_USERS,
    users: json,
    pages: Math.ceil(json.length/10)
  }
}


function requestUser() {
  return {
    type: REQUEST_SINGLE_USER,
  }
}

function receiveUser(json) {
  return {
    type: RECEIVE_SINGLE_USER,
    user: json
  }
}


function fetchUsers() {
  return dispatch => {
    dispatch(requestUsers())
    return fetch(`https://api.github.com/users`)
      .then(response => response.json())
      .then(json => dispatch(receiveUsers(json)))
  }
}

function fetchSingleUser(user) {
  return dispatch => {
    dispatch(requestUser())
    return fetch(`https://api.github.com/users/${user}`)
      .then(response => response.json())
      .then(json => dispatch(receiveUser(json)))
  }
}

export function fetchUsersList(user) {
  return (dispatch, getState) => {
    return user ? dispatch(fetchSingleUser(user)) : dispatch(fetchUsers())
  }
}
