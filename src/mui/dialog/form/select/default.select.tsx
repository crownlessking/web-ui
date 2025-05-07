import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { THive } from '..';
import StateFormItemSelect from '../../../../controllers/templates/StateFormItemSelect';

interface IDialogSelectDefault {
  def: StateFormItemSelect;
  hive: THive;
}

export default function DialogSelectDefault (props: IDialogSelectDefault) {
  const { def: select, hive } = props;
  const [value, setValue] = useState<string>(hive[select.name] ?? '');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    hive[select.name] = event.target.value as string;
  };

  return (
    <FormControl {...select.formControlProps}>
      <InputLabel {...select.inputLabelProps}>
        { select.text }
      </InputLabel>
      <Select {...select.props} value={value} onChange={handleChange}>
        <MenuItem value=''></MenuItem>
        {select.has.items.map((item, i) => (
          <MenuItem value={item.value} key={`select-menu-item${i}`}>
            { item.title || item.value }
          </MenuItem>
        ))}
      </Select>
      <FormHelperText {...select.formHelperTextProps}>
        { select.has.helperText }
      </FormHelperText>
    </FormControl>
  );
}
