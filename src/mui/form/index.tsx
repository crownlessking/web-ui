import { Fragment } from 'react';
import { Box, Paper, Stack } from '@mui/material';
import StateForm from '../../controllers/StateForm';
import { remember_exception } from '../../business.logic/errors';
import { log } from '../../business.logic/logging';

interface IJsonFormProps {
  def: StateForm;
  children: any;
}

function ConditionalPaper (
  { form, children }:{ form: StateForm, children: any }
) {
  if (form.paperBackground) {
    return (
      <Paper {...form.paperProps}>
        { children }
      </Paper>
    );
  } else {
    return (
      <Fragment>
        { children }
      </Fragment>
    );
  }
}

export default function StateJsxForm (
  { def: form, children }: IJsonFormProps
) {
  const map: {[constant: string]: () => JSX.Element} = {
    'box': () => (
      <ConditionalPaper form={form}>
        <Box
          {...form.props}
        >
          { children }
        </Box>
      </ConditionalPaper>
    ),
    'stack': () => (
      <ConditionalPaper form={form}>
        <Stack {...form.props}>
          { children }
        </Stack>
      </ConditionalPaper>
    ),
    'none': () => (
      <ConditionalPaper form={form}>
        { children }
      </ConditionalPaper>
    )
  };

  try {
    return map[form._type]();
  } catch (e: any) {
    remember_exception(e);
    log(e.message);
  }
  return map['box']();
}
