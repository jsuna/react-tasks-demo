import { FETCHING, RESP_TASKS, EDIT_TASK, EDIT_DONE, SET_USER } from '../actions'

const initialState = {
  user: { username: '' },
  ux: {
    sortDir: 1,
    sortBy: 'priority',
    isFetching: false,
    isEditing: false
  },
  editTask: {},
  tasks: []
}

export default function taskApp(state = initialState, action) {
  let { type, isFetching, isEditing, tasks, task, user } = action
  switch (type) {
    case FETCHING:
      return Object.assign({}, state, { ux: { isFetching: true }})
    case RESP_TASKS:
      return Object.assign({}, state, { tasks, ux: { isFetching } })
    case EDIT_TASK:
      return Object.assign({}, state, { editTask: task, ux: { isEditing } })
    case EDIT_DONE:
      return Object.assign({}, state, { editTask: {}, ux: { isEditing } })
    case SET_USER:
      return Object.assign({}, state, { user })
    default:
      return state
  }
}
