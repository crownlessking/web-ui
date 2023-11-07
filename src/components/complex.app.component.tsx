import { Fragment } from 'react'
import Box from '@mui/material/Box'
import { CssBaseline } from '@mui/material'
import AppBar from '../mui/appbar'
import Drawer from '../mui/drawer'
import StatePage from '../controllers/StatePage'
import { Background } from '../mui/background'
import Dialog from '../mui/dialog'
import Layout from './layout.component'
import Content from './content'
import Spinner from './spinner.component'
import Snackbar from '../mui/snackbar'

interface IComplexAppProps {
  def: StatePage
}

export default function ComplexApp ({ def: page }: IComplexAppProps) {
  page.setTabTitle()
  return (
    <Fragment>
      <Background def={page.background} />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar def={page} />
        <Drawer def={page} />
        <Layout def={page}>
          <Content def={page} />
        </Layout>
      </Box>
      <Dialog />
      <Snackbar />
      <Spinner />
    </Fragment>
  )
}
