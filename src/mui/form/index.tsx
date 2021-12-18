import React from 'react'
import { Box, Paper, Stack } from '@mui/material'
import StatePage from '../../controllers/StatePage'

interface IProps {
  def: StatePage
  children: any
}

function ConditionalPaper (
  { show: showPaper, children }:{ show: boolean, children: any }
) {
  if (showPaper) {
    return (
      <Paper>
        { children }
      </Paper>
    )
  } else {
    return (
      <React.Fragment>
        { children }
      </React.Fragment>
    )
  }
}

export default function (
  { def: page, children }: IProps
) {
  const form = page.parent.parent.allForms.getForm(page.contentName)
  switch (form.type) {
  default:
  case 'default':
    return (
      <ConditionalPaper show={form.paperBackground}>
        <Box autoComplete="off" {...form.props} component="form">
          { children }
        </Box>
      </ConditionalPaper>
    )
  case 'stack':
    return (
      <ConditionalPaper show={form.paperBackground}>
        <Stack {...form.props}>
          { children }
        </Stack>
      </ConditionalPaper>
    )
  }
}

// const styles = ({ spacing }: Theme) => createStyles({
//   container: {
//     // fontWeight: 'bold',
//     display: 'table',
//     // flexFlow: 'column',
//   },
//   root: {
//     padding: spacing(2, 3, 2, 3)
//   }
// })

// const Form = ({ children, classes }: any) => (
//   <form className={classes.container} autoComplete='off'>
//     { children }
//   </form>
// )

// const FormOnPaper = ({ children, classes }: any) => (
//   <Paper className={classes.root} elevation={4}>
//     <Form classes={classes}>
//       { children }
//     </Form>
//   </Paper>
// )

// interface IProps extends WithStyles<typeof styles> {
//   def: StatePage
// }

// export default withStyles(styles)(class extends Component<IProps> {

//   public render() {
//     const { def: page } = this.props
//     const form = page.parent.parent.allForms.getForm(page.contentName)

//     if (form.paperBackground) {
//       return (
//         <FormOnPaper { ...this.props} />
//       )
//     }

//     return <Form { ...this.props} />
//   } // END render()

// })
