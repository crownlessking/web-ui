import React, { Component } from 'react'
import {
  Paper, Theme, createStyles, withStyles, WithStyles
} from '@material-ui/core'
import StatePage from '../../state/pages/page.controller'

const styles = ({ mixins }: Theme) => createStyles({
  container: {
    // fontWeight: 'bold',
    display: 'table',
    // flexFlow: 'column',
  },
  root: mixins.gutters({
    paddingBottom: 16,
    paddingTop: 16,
  }),
})

const Form = ({ children, classes }: any) => (
  <form className={classes.container} autoComplete='off'>
    { children }
  </form>
)

const FormOnPaper = ({ children, classes }: any) => (
  <Paper className={classes.root} elevation={4}>
    <Form classes={classes}>
      { children }
    </Form>
  </Paper>
)

interface IProps extends WithStyles<typeof styles> {
  def: StatePage
}

export default withStyles(styles)(class extends Component<IProps> {

  public render() {
    const { def: page } = this.props
    const form = page.parent.parent.allForms.getForm(page.contentName)

    if (form.paperBackground) {
      return (
        <FormOnPaper { ...this.props} />
      )
    }

    return <Form { ...this.props} />
  } // END render()

})
