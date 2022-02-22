import { Input } from '@mui/material'
import { useSelector } from 'react-redux'
import StateFormItem from '../../../controllers/StateFormItem'
import { RootState } from '../../../state'
import { getFieldValue } from './controller'
import { getAdornment } from './json.input.adornment'

export default function JsonInput ({ def: input }: { def: StateFormItem }) {
  const formsData = useSelector<RootState>(state => state.formsData)
  const value = getFieldValue(formsData, input.parent.name, input.name)

  return (
    <Input
      startAdornment={getAdornment(input.has.startAdornment)}
      {...input.props}
      error={input.has.regexError(value)}
      value={value}
      onChange={input.onChange(input.name)}
    />
  )
}
