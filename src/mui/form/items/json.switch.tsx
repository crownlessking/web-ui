import {
  FormControl, FormLabel, FormGroup, FormControlLabel, Switch, FormHelperText,
  TextField
} from '@mui/material'
import { getBoolValue } from '../controller'
import { RadioProps } from '@mui/material/Radio'
import { RootState } from '../../../state'
import { getFieldValue } from './controller'
import StateFormItem from '../../../controllers/StateFormItem'
import { FIELD_NAME_NOT_SET } from '../../../controllers'
import { useSelector } from 'react-redux'

interface IJsonSwitchProps {
  def: StateFormItem
}

export default function JsonSwitch ({ def }: IJsonSwitchProps) {
  const { disabled, name, onChange } = def
  const has = def.has
  const formsData = useSelector<RootState>(state => state.formsData)
  const getValue = () => getFieldValue(formsData, def.parent.name, def.name)

  return name ? (
    <FormControl component="fieldset">
      <FormLabel component="legend">&nbsp;</FormLabel>
      <FormGroup>
        <FormControlLabel
          label={has.label || has.title || name}
          control={
            <Switch
              disabled={disabled === true}
              checked={getBoolValue(getValue())}
              onChange={onChange(name, getValue())}
              value={name}
              color={has.json.color as RadioProps['color']}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
        />
      </FormGroup>
      <FormHelperText>{has.text || ' '}</FormHelperText>
    </FormControl>
  ) : (
    <TextField value={`SWITCH ${FIELD_NAME_NOT_SET}`} disabled />
  )
}
