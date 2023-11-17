import { Fragment } from 'react'
import IStatePage from 'src/interfaces/IStatePage'
import StateAllPages from 'src/controllers/StateAllPages'
import ComplexApp from './complex.app.component'
import GenericApp from './generic.app.component'

interface IGenericAppProps {
  def: StateAllPages
}

export default function AppPage({ def: allPages }: IGenericAppProps) {
  const page = allPages.getPage()
  const AppMap: {[type in Required<IStatePage>['_type']]: JSX.Element | null} = {
    'generic': <GenericApp def={page} />,
    'complex': <ComplexApp def={page} />,
  }

  return (
    <Fragment>
      { AppMap[page._type] }
    </Fragment>
  )
}