import * as React from 'react'
import Switch from '@mui/material/Switch'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function ControlledSwitches ({ name, label, checked, setChecked }) {
  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={handleChange}
          name={name}
        />
          }
      label={label}
    />
  )
}
