import React from 'react'
import StatePage from '../controllers/StatePage'

interface IProps {
  def: StatePage
}

export default class WebApp extends React.Component<IProps> {

  render() {
    const name = this.props.def.contentName.toUpperCase()
    switch (name) {

    default:
      return <div>Dummy Web App!</div>
    }
  }

}
