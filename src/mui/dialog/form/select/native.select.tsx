import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import { useState } from 'react';
import { THive } from '..';
import StateFormItemSelect from '../../../../controllers/templates/StateFormItemSelect';

interface IDialogSelectNative {
  def: StateFormItemSelect;
  hive: THive;
}

export default function DialogSelectNative (props: IDialogSelectNative) {
  const { def: select, hive } = props;
  select.configure('native');
  const [value, setValue] = useState<string>(hive[select.name] ?? '');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value as string);
    hive[select.name] = e.target.value as string;
  }

  return (
    <FormControl {...select.formControlProps}>
      <InputLabel {...select.inputLabelProps}>
        { select.text }
      </InputLabel>
      <NativeSelect
        {...select.props}
        value={value}
        inputProps={{
          name: select.name,
          id: select.config_id,
        }}
        onChange={handleChange}
      >
        <option value=''></option>
        {select.has.items.map((option, i) => (
          <option value={option.value} key={`select-menu-option${i}`}>
            { option.title || option.value }
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
