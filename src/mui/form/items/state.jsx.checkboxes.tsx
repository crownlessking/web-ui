import { FormControl } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { useSelector } from 'react-redux';
import StateFormItemCheckbox from '../../../controllers/templates/StateFormItemCheckbox';
import { RootState } from '../../../state';
import {
  get_redux_store_val,
  get_statuses,
  ICheckboxesData
} from './_items.common.logic';

interface IJsonCheckboxes {
  def: StateFormItemCheckbox;
}

export default function StateJsxCheckboxes ({ def: checkboxes }: IJsonCheckboxes) {
  const { name, parent: { name: formName }} = checkboxes;
  const formsData = useSelector<RootState>(state => state.formsData);
  const checkedValues = get_redux_store_val<string[]>(
    formsData,
    formName,
    name,
    []
  );
  const data: ICheckboxesData = {
    checkedValues,
    value: '',
    checked: false,
    statuses: {}
  };
  data.statuses = get_statuses(data.checkedValues);

  return (
    <FormControl
      component='fieldset'
      variant='standard'
      {...checkboxes.has.formControlProps}
    >
      <FormLabel component="legend" {...checkboxes.has.formLabelProps}>
        { checkboxes.text }
      </FormLabel>
      <FormGroup {...checkboxes.has.formGroupProps}>
        {checkboxes.has.items.map((box, i) => (
          <FormControlLabel
            {...box.formControlLabelProps}
            key={`form-control-label${i}`}
            label={box.label}
            control={
              <Checkbox
                {...box.props}
                checked={data.statuses[box.name] ?? false}
                onChange={checkboxes.onChange(name, data)}
                name={box.name}
                color={box.has.state.color || checkboxes.has.state.color}
              />
            }
          />
        ))}
      </FormGroup>
      <FormHelperText {...checkboxes.has.formHelperTextProps}>
        { checkboxes.has.helperText }
      </FormHelperText>
    </FormControl>
  );
}
