import { connect } from 'react-redux'
import { getTasks, addTask, updateTask, deleteTask, editTask, authUser, editDone } from '../actions'
import { MainApp } from '../components' //connected dumb component

const mapStateToProps = state => {
  let { tasks, ux, editTask, user } = state
  return { tasks, editTask, user, isFetching: ux.isFetching, isEditing: ux.isEditing }
}
const mapDispatchToProps = dispatch => {
  return {
    auth: (user) => dispatch(authUser(user)),
    loadTasks: () => dispatch(getTasks()),
    addTask: (task) => dispatch(addTask(task)),
    updateTask: (task) => dispatch(updateTask(task)),
    deleteTask: (task) => dispatch(deleteTask(task)),
    editHandler: (task) => dispatch(editTask(task)),
    editDone: () => dispatch(editDone())
  }
}
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp)

export default App;
