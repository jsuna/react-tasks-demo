import React, { Component } from 'react'
import { Button, ButtonGroup, Grid, Row, Col } from 'react-bootstrap'
import FieldGroup from './FieldGroup'
class FormBase extends Component {
  model = {}
  constructor(props) {
    super(props)
    // form model
    this.model = {}

    //local state
    this.state = Object.assign({}, this.model)
  }

  handleInputChange = (e) => {
    let { type, name, checked=null, value=null } = e.target
    value = type.match(/checkbox|radio/) ? checked : value

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let { saveHandler } = this.props
    saveHandler(this.state)
    this.clearForm()
  }

  clearForm = (e) => {
    this.setState(this.model)
    this.props.editDone()
  }
}

class FormTask extends FormBase {
  model = {
    _id: '',
    created: 0,
    user: '',
    name: '',
    description: '',
    priority: 1,
    is_complete: false
  }
  constructor(props) {
    super(props)
    this.state = this.model
  }
  cancel = () => {
    this.clearForm()
    this.props.editDone()
  }
  componentWillReceiveProps(nextProps) {
    let { isEditing, editTask } = nextProps
    if (isEditing) {
      this.setState(editTask)
    }
  }
  updateTask = (e) => {
    e.preventDefault()
    this.props.updateTask(this.state)
    this.clearForm()
  }
  render() {
    this.inputs = {}
    let { isEditing } = this.props
    let TaskActions = (isEditing) ? (
      <Row>
        <Col xs={8}>
          <h4>Editing...</h4>
        </Col>
        <Col xs={4}>
          <ButtonGroup bsSize="sm" bsClass="pull-right btn-group">
            <Button>✓</Button>
            <Button>X</Button>
          </ButtonGroup>
        </Col>
      </Row>
    ) : null;

    let TaskFields = (
      <Grid fluid>
        {TaskActions}
        <Row>
          <Col md={8}>
            <FieldGroup
                value={this.state.name}
                name="name"
                onChange={this.handleInputChange}
                fgClass="form-group margin-bottom-0"
                type="text"
                placeholder="Task Name" />
          </Col>
          <Col md={4}>
            <FieldGroup
                value={this.state.priority}
                name="priority"
                onChange={this.handleInputChange}
                fgClass="form-group margin-bottom-0"
                type="number"
                placeholder="Priority" />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FieldGroup
                value={this.state.description}
                name="description"
                rows={8}
                onChange={this.handleInputChange}
                componentClass="textarea"
                placeholder="Task Decription" />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ButtonGroup bsSize="sm">{
                (!isEditing) ?
                  <Button onClick={e=>this.handleSubmit(e)}>add</Button>
                 :
                  <Button onClick={e=>this.updateTask(e)}>update</Button>
              }
              <Button onClick={this.clearForm}>cancel</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Grid>
    )

    return (<form>{TaskFields}</form>)
  }
}

export default FormTask
