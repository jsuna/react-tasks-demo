import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { TaskListItem } from './TaskListItem'

export const TaskList = ({ tasks, deleteTask, editHandler }) => {
  let noTasks = <div className="no-tasks"></div>
  return (<ListGroup>{
    (tasks && tasks.length) ? tasks.map((task) => {
      return (<TaskListItem
        key={task._id}
        task={task}
        deleteHandler={(task) => deleteTask(task)}
        editHandler={(task) => editHandler(task)}
        />)
    }) : noTasks
  }</ListGroup>)
}
