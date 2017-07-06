import React from 'react'
import { Button, ListGroupItem, ButtonGroup, Clearfix } from 'react-bootstrap'

export const TaskListItem = ({ task, deleteHandler, editHandler }) => {
  let { created, name, priority } = task;
  // let hrDay = 86400
  // let timeNow = Math.round(new Date().getTime()/1000);
  // let defaultDueDays = 10;
  // let dueDate = created+(hrDay*defaultDueDays)
  // let daysLeft = (dueDate-timeNow <= 0) ? 0 : Math.round((((dueDate-timeNow)/60)/60)/24)

  return (
    <ListGroupItem>
      <Clearfix>
        <Button onClick={(e) => editHandler(task)} bsStyle="link">{priority}. {name}</Button>
        <ButtonGroup bsSize="sm" bsClass="pull-right btn-group">
          <Button disabled bsStyle="link" title="Evenually change date">
            <small>{new Date(created*1000).toString()}</small>
          </Button>
          <Button>✓</Button>
          <Button onClick={(e) => deleteHandler(task)}>X</Button>
        </ButtonGroup>
      </Clearfix>
    </ListGroupItem>
  )
}


