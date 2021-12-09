import React from 'react'
import { IStateBackground } from '../../interfaces'
import { createStyles, Fade, makeStyles } from '@material-ui/core'
import { StyleRules } from '@material-ui/styles'
import StateBackground from '../../controllers/StateBackground'
import StatePage from '../../controllers/StatePage'
import _ from 'lodash'

export function getBackgroundCss({type, value}: IStateBackground) {
  switch (type) {
  case 'color':
    return { backgroundColor: value+'' }
  case 'gradient':
  case 'image':
    return { backgroundImage: value+'' }
  case 'none':
    return {}
  }
}

interface IProps {
  def: StateBackground<StatePage>,
  children?: any
}

export const Background = function ({ def: background, children }: IProps) {
  const rules = {
    background: _.extend<StyleRules>({
      height: 'inherit',
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: -9999
    }, getBackgroundCss(background.json))
  }
  const useStyles = makeStyles(() => createStyles(rules))
  const classes = useStyles()

  return (
    <Fade in={true}>
      <div className={classes.background}>
        { children }
      </div>
    </Fade>
  )
}
