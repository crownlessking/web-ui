import { Component } from 'react'
import { IconButton, Paper } from '@mui/material'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import {
  ArrowBackIos, ArrowForwardIos, FirstPage, LastPage
} from '@mui/icons-material'
import { connect } from 'react-redux'
import { RootState } from '../../../state'
import { getLinkUri, getOriginEndingFixed } from './controller'
import { getReqState } from '../../../state/net.controller'
import { getVal, getDudEventCallback, getUriQuery } from '../../../controllers'
import { IStateTopLevelLinks } from '../../../controllers/StateTopLevelLinks'
import { IJsonapiLink, IJsonapiPaginationLinks } from '../../../controllers/StateNet'

const styles = () => createStyles({
  root: {
    marginTop: 5,
    paddingBottom: 4, // 8
    paddingTop: 4, // 8
    display: 'flex',
    justifyContent: 'center'
  },
  controls: {
    display: 'flex',
    minHeight: '43px',
  },
  filesProgress: {
    marginTop: '6%'
  }
})

const mapStateToProps = (state: RootState) => ({
  origin: state.app.origin,
  topLevelLinks: state.topLevelLinks,
  meta: state.meta
})

const mapDispatchToProps = { getReqState }

interface IPaginationProps extends WithStyles<typeof styles> {
  endpoint: string
  topLevelLinks: IStateTopLevelLinks
  getReqState: (origin: string, endpoint: string, args?: string) => void
  meta: any
  origin?: string
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)
(class Pagination extends Component<IPaginationProps> {

  render() {
    const {
      firstIconButton: FirstIconButton,
      prevIconButton: PrevIconButton,
      filesProgress: FilesProgress,
      nextIconButton: NextIconButton,
      lastIconButton: LastIconButton,
      props: { classes, endpoint, topLevelLinks, meta } } = this
    const links = topLevelLinks[endpoint]
    return (
      <Paper className={classes.root}>
        <div className={classes.controls}>
          <FirstIconButton links={links} />
          <PrevIconButton links={links} />
          <FilesProgress endpoint={endpoint} meta={meta} classes={classes} />
          <NextIconButton links={links} />
          <LastIconButton links={links} />
        </div>
      </Paper>
    )
  }

  getButtonProps (icon: string, links?: IJsonapiPaginationLinks) {
    let updateListing = getDudEventCallback()
    let disabled = true
    if (links && links[icon]) {
      updateListing = this.updateListing(links[icon])
      disabled = false
    }
    return { disabled, onClick: updateListing }
  }

  firstIconButton = ({ links }: any) => {
    const buttonProps = this.getButtonProps('first', links)
    return (
      <IconButton {...buttonProps}>
        <FirstPage />
      </IconButton>
    )
  }

  prevIconButton = ({ links }: any) => {
    const buttonProps = this.getButtonProps('prev', links)
    return (
      <IconButton {...buttonProps}>
        <ArrowBackIos />
      </IconButton>
    )
  }

  nextIconButton = ({ links }: any) => {
    const buttonProps = this.getButtonProps('next', links)
    return (
      <IconButton {...buttonProps}>
        <ArrowForwardIos />
      </IconButton>
    )
  }

  lastIconButton = ({ links }: any) => {
    const buttonProps = this.getButtonProps('last', links)
    return (
      <IconButton {...buttonProps}>
        <LastPage />
      </IconButton>
    )
  }

  filesProgress = ({ endpoint, meta, classes }: any) => {
    const pagination = getVal(meta, `${endpoint}.pagination`)
    return (
      <div className={classes.filesProgress}>
        { `${pagination.page} / ${pagination.pageTotal}` }
      </div>
    )
  }

  updateListing = (link?: IJsonapiLink | string) => (e: any) => {
    const args = getUriQuery(getLinkUri(link))
    const origin = getOriginEndingFixed(this.props.origin)
    this.onGetRequest(origin, this.props.endpoint, args)
  }

  onGetRequest(origin: string, endpoint: string, args?: string) {
    this.props.getReqState(origin, endpoint, args)
  }

}))
