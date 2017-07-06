import React from 'react'
import { Navbar, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

export const FilterBar = ({ user }) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Button bsStyle="link">TaskX</Button>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
        <Navbar.Form pullLeft>
          <FormGroup controlId="status-filter">
            <ControlLabel>Show</ControlLabel> {' '}
            <FormControl bsSize="sm" componentClass="select" value="active">
              <option value="active">Active</option>
              <option value="complete">Complete</option>
              <option value="all">All</option>
            </FormControl>
          </FormGroup>
        </Navbar.Form>

        <Navbar.Form pullRight>
          <Button bsSize="sm" bsStyle="success">Logged in: {user.username}</Button>
        </Navbar.Form>
      </Navbar.Collapse>
    </Navbar>
  )
}
