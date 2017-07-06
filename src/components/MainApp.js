import React, { Component } from 'react'
import {Grid, Row, Col, Well, Alert} from 'react-bootstrap'
import { TaskList, FormTask, FilterBar } from '.'

import '../App.css'

class MainApp extends Component {
  componentDidMount() {
    this.props.auth({
        username: 'jsuna30@yahoo.com',
        password: 'jasonpa55word'
    }).then(r => {
      this.props.loadTasks()
    })
  }

  render() {
    let { isFetching, tasks, addTask, updateTask, deleteTask, editHandler, editDone, isEditing, editTask, user } = this.props;
    let TaskListProps = { tasks, deleteTask, editHandler }
    let FormTaskProps = { saveHandler: addTask, updateTask, isEditing, editTask, editDone }

    return (
      <div className="main">
        <FilterBar user={user} />
        <Grid className="App">
          <Row>
            <Col md={8}>
              {(isFetching) ? <Alert bsStyle="info">Loading</Alert> : null}
               <TaskList {...TaskListProps} />
            </Col>
            <Col md={4}>
              <Well>
                <FormTask {...FormTaskProps} />
              </Well>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default MainApp
