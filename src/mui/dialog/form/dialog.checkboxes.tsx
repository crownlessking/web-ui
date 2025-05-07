import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { RadioProps } from '@mui/material/Radio';
import { Fragment, useState } from 'react';
import { THive } from '.';
import StateForm from '../../../controllers/StateForm';
import StateFormItem from '../../../controllers/StateFormItem';
import StateFormItemCheckboxBox from '../../../controllers/StateFormItemCheckboxBox';
import { ICheckboxesData, update_checkboxes } from '../../form/items/_items.common.logic';

interface IDialogCheckboxes {
  def: StateFormItem<StateForm, StateFormItemCheckboxBox>;
  hive: THive;
}

export default function DialogCheckboxes ({
  def: checkboxes,
  hive
}: IDialogCheckboxes) {
  const defaultCheckedValues = hive[checkboxes.name] as string[];
  const [
    checkedValues,
    setCheckedValues
  ] = useState<string[]>(defaultCheckedValues);
  const data: ICheckboxesData = {
    checkedValues,
    value: '',
    checked: false,
    statuses: {}
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    data.value = e.target.value;
    data.checked = e.target.checked;
    update_checkboxes(data);
    setCheckedValues(data.checkedValues);
    hive[checkboxes.name] = data.checkedValues;
  };

  return (
    <Fragment>
      {checkboxes.has.items.map((box, i) => (
        box.hasLabel
        ? (
          <FormControlLabel
            {...box.formControlLabelProps}
            key={`form-control-label${i}`}
            label={box.label}
            control={
              <Checkbox
                {...box.props}
                checked={data.statuses[box.name]}
                onChange={handleChange}
                value={box.name}
                color={
                  box.color || (checkboxes.has.color as RadioProps['color'])
                }
              />
            }
          />
        ) : (
          <Checkbox
            {...box.props}
            checked={data.statuses[box.name]}
            onChange={handleChange}
            color={
              box.color || (checkboxes.has.color as RadioProps['color'])
            }
            disabled={box.disabled}
          />
        )
      ))}
    </Fragment>
  );
}
