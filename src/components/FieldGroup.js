import React from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

const FieldGroup = ({ id, label, help, fgClass = 'form-group', ...props }) => {
  return (
    <FormGroup controlId={id} bsClass={fgClass}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default FieldGroup
