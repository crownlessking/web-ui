import { Fragment } from 'react'
import Appbar from '../mui/appbar'
import Drawer from '../mui/drawer'
import Layout from './layout.component'
import Content from './content'
import { Background } from '../mui/background'
import Dialog from '../mui/dialog'
import Spinner from './spinner.component'
import Snackbar from '../mui/snackbar'
import StatePage from 'src/controllers/StatePage'

interface IGenericAppProps {
  def: StatePage
}

export default function GenericApp ({ def: page }: IGenericAppProps) {
  page.setTabTitle()
  return (
    <Fragment>
      <Background def={page.background} />
      <Appbar def={page} />
      <Drawer def={page} />
      <Layout def={page}>
        <Content def={page} />
      </Layout>
      <Dialog />
      <Snackbar />
      <Spinner />
    </Fragment>
  )
}
