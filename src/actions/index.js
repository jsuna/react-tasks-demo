/*
 * action types
 */
import fetch from 'isomorphic-fetch'

const API_EP = 'http://localhost:9000/api/v1/'

export const RESP_TASKS = 'RESP_TASKS'

export const EDIT_TASK = 'EDIT_TASK'
export const EDIT_DONE = 'EDIT_DONE'

export const FETCHING = 'FETCHING'
// export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const SET_USER = 'SET_USER'
/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */
function fetching() {
  return { type: FETCHING, isFetching: true }
}

function respTasks(tasks) {
  return { type: RESP_TASKS, tasks, isFetching: false }
}

export function editTask(task) {
  return { type: EDIT_TASK, task, isEditing: true }
}

export function editDone(task) {
  return { type: EDIT_DONE, isEditing: false }
}

// function setVisibilityFilter(filter) {
//   return { type: SET_VISIBILITY_FILTER, filter }
// }
function setUser(user) {
  return { type: SET_USER, user }
}
//async actions
export function authUser(user) {
  return dispatch => {
    let storn_ep = 'https://api.storn.co/' //`${API_EP}token`

    return fetch(storn_ep,{
        method:'post',
        credentials: 'include',
        body: JSON.stringify(user)
      }).then(r => dispatch(setUser(user)))
  }
}
export function getTasks() {
  return (dispatch, getState) =>  {
    let { tasks, ux } = getState()
    if (!tasks.length || !ux.isFetching) {
      dispatch(fetching())
      return fetch(`${API_EP}task`).then(r => r.json()).then(resp => {
        dispatch(respTasks(resp))
      })
    }
    dispatch(respTasks(tasks))
  }
}

export function addTask(task) {
  return (dispatch, getState) => {
    dispatch(fetching())
    task.created = Math.round(new Date().getTime()/1000)
    task.user = getState().user.username
    return fetch(`${API_EP}task`, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        mode: 'cors',
        body: JSON.stringify({ task, rePrioritize: true })
      }).then(r => r.json()).then(resp => {
      dispatch(respTasks(resp))
    })
  }
}

export function updateTask(task) {
  let taskId = task._id
  return dispatch => {
    return fetch(`${API_EP}task/${taskId}`, {
      method: 'PATCH',
      headers: {'Content-Type':'application/json'},
      mode: 'cors',
      body: JSON.stringify({ task })
    }).then(r => r.json()).then(resp => {
      dispatch(editDone())
      dispatch(respTasks(resp))
    })
  }
}

export function deleteTask(task) {
  let taskId = task._id
  return dispatch => {
    return fetch(`${API_EP}task/${taskId}`, {
      method: 'delete',
      headers: {'Content-Type':'application/json'},
      mode: 'cors',
      body: JSON.stringify({ task, rePrioritize: true })
    }).then(r => r.json()).then(resp => {
      dispatch(respTasks(resp))
    })
  }
}
