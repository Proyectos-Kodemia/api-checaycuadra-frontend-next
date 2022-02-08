import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormHelperText from '@mui/material/FormHelperText';

export default function ControlledSwitches(label) {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      label= {label}
    />
  )
}