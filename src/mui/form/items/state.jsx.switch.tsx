import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { RootState } from '../../../state';
import { get_redux_store_val, ICheckboxesData } from './_items.common.logic';
import { useSelector } from 'react-redux';
import StateFormItemSwitch from '../../../controllers/templates/StateFormItemSwitch';
import FormLabel from '@mui/material/FormLabel';
import { NAME_NOT_SET } from '../../../constants';

interface IJsonSwitchProps {
  def: StateFormItemSwitch;
}

/**
 * Switch use example:
 * 
 * ```ts
 * const $witch = {
 *   'type': 'switch',
 *   'name': '', // [required] unique name
 *   'label': '', // [optional]
 *   'has': {
 *     'items': [
 *       {
 *         'name': 'switch1', // [required] unique name
 *         'label': 'Switch1', // [required] human readable name
 *       },
 *       // ... (more switch defintions)
 *     ],
 *     'helperText': '', // [optional]
 *     'onchangeHandle': '<functionIdentifier>'
 *   }
 * };
 * ```
 * @param props 
 * @returns 
 */
export default function StateJsxSwitch (props: IJsonSwitchProps) {
  const switchGroup = props.def;
  const { name } = switchGroup;
  const formsData = useSelector<RootState>(state => state.formsData);
  const values = get_redux_store_val<string[]>(
    formsData,
    switchGroup.parent.name,
    name,
    []
  );
  const data: ICheckboxesData = {
    checkedValues: values,
    value: '',
    checked: false,
    statuses: {}
  };

  return name ? (
    <FormControl {...switchGroup.formControlProps}>
      <FormLabel
        component="legend"
        {...switchGroup.formLabelProps}
      >
        { switchGroup.label }
      </FormLabel>
      <FormGroup {...switchGroup.formGroupProps}>
        {switchGroup.has.items.map(($witch, i) => (
          <FormControlLabel
            {...$witch.formControlLabelProps}
            key={`${name}${i}`}
            control={
              <Switch
                {...$witch.props}
                name={$witch.name}
                onChange={switchGroup.onChange(name, data)}
              />
            }
            label={$witch.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  ) : (
    <TextField value={`SWITCH ${NAME_NOT_SET}`} disabled />
  );
}
