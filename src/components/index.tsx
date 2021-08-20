import React, { Component } from 'react'
import StatePage from '../state/pages/page.controller'

interface IProps {
  def: StatePage
}

export default class extends Component<IProps> {

  render() {
    const name = this.props.def.contentName.toUpperCase()
    switch (name) {

    default:
      return <div>Dummy Web App!</div>
    }
  }

}
