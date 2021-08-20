/**
 * [ TODO ] Column definitions will be located in the `meta` member of the
 *          server response.
 *          If it is missing, it will be automatically generated, and all
 *          data will be considered a `string`.
 *
 * **Example JSON response containing the meta definition**
 *
 * ```json
 * {
 *    "data": [],
 *    "meta": {
 *      "ui": [
 *        {
 *          "label": "Frozen Yoghurt",
 *          "width": "", // {number}
 *          "flexGrow": "1.0", // [optional] {number} Causes the cell to take
 *                             // more space
 *          "dataKey": "frozen_yoghurt"
 *        }
 *        // ...(more)
 *      ]
 *    }
 * }
 * ```
 */

import React, { Component } from 'react'
import { Dispatch } from 'redux'
import {
  createStyles, Paper, Theme, WithStyles, withStyles
} from '@material-ui/core'
import VirtualizedTable from './v-table'
import {
  stretchToBottom as getHeight,
} from '../../../controllers'
import {
  getVirtualizedTableColumns,
  ISingleRow,
  applyDefaultSubmissionCallback,
  getSortedRows,
  filterRow,
} from './controller'
import { connect } from 'react-redux'
import { IState } from '../../../interfaces'
import Pagination from './pagination'
import { postRequest } from '../../../state/net'
import TableDialog from './dialog'
import { writeSuccess, writeError } from '../../snackbar/actions'
import StatePage from '../../../state/pages/page.controller'

const styles = ({ mixins, palette }: Theme) => createStyles({
  root: mixins.gutters({
    paddingBottom: 16,
    paddingTop: 16,
  }),
  centeredText: {
    color: palette.text.secondary,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)'
  },
  dialogContentText : {
    margin: 'auto'
  },
  centeredDialogContent: {
    margin: 'auto',
    width: 'inherit'
  },
  dialogTitle: {
    margin: 'auto'
    // marginLeft: spacing(2),
    // flex: 1,
  },
  form: {
    minWidth: 350
  },
  paper: {
    position: 'relative'
  },
})

// const mapStateToProps = (state: IState) => ({
//   dataSource: state.data,
//   linkSource: state.topLevelLinks
// })

const mapDispatchToProps = { postRequest, writeSuccess, writeError }

interface IProps extends WithStyles<typeof styles> {
  // dataSource: any
  // linkSource: any
  def: StatePage
  postRequest: (
    endpoint: string,
    body: RequestInit['body'],
    success?: (res: any, dispatch?: Dispatch, state?: ()=>IState) => void,
    error?: (err: any, dispatch?: Dispatch, state?: ()=>IState) => void
  ) => void
  writeSuccess: (msg: string) => void
  writeError: (msg: string) => void
}

interface ILocalState {
  docOpen: boolean
  formData: any
  singleRow?: ISingleRow
}

/**
 * Data is displayed in a table and pagination controls are available at the
 * bottom of the page.
 * When a table row is clicked, a fullscreen dialog will open showing the data
 * of that row in a form.
 * The form data could be used to edit the data although that is most likely 
 * not the case.
 *
 * @see https://material-ui.com/components/tables/#virtualized-table
 */
class Table extends Component<IProps, ILocalState> {

  /**
   * Constructor
   */
  constructor(props: any) {
    super(props)
    this.state = {
      docOpen: false,
      formData: {},
      singleRow: {event: undefined, index: -1, rowData: undefined}
    }
  }

  /**
   * Get the rows of data from the redux store.
   *
   * i.e. `state.data`
   *
   * Then the `endpoint` is used to retrieve a particular set of data.
   *
   * i.e. `state.data[endpoint]`
   *
   * Note: `state` is the identify for the Redux store.
   */
  getRows = () => {
    const page = this.props.def
    const endpoint = page.contentEndpoint
    return page.parent.parent.data.get(endpoint)
  }

  /**
   * Get new height when the browser window is resized.
   */
  updateHeight = () => {
    // You're basically telling react to re-render the component
    this.setState({})
  }

  /**
   * Callback function for closing the document dialog.
   */
  handleClose = () => {
    this.setState({ docOpen: false })
  }

  /**
   * Success snackbar will appear with message if data submission was
   * successful.
   */
  onWriteSuccess = (msg: string) => this.props.writeSuccess(msg)

  /**
   * Error snackbar will appear with message if an error occurred when
   * submitting the data.
   */
  onWriteError = (msg: string) => this.props.writeError(msg)

  /**
   * Will make a post request to submit the data
   */
  onPostRequest = (
    endpoint: string,
    data: any,
    success: (res: any, dispatch?: Dispatch, state?: () => IState)=>void,
    error: (err: any, dispatch?: Dispatch, state?: () => IState)=>void
  ) => this.props.postRequest(endpoint, data, success, error)

  /**
   * Default submission callback.
   *
   * Function for submitting (saving) the changes made to the data within the
   * document dialog form.
   */
  handleSubmission = () => {
    const page = this.props.def
    const endpoint = page.contentEndpoint
    this.onPostRequest(endpoint, this.state.formData, () => {
      this.onWriteSuccess('Changes successfully saved.')
    }, (res: any) => {
      this.onWriteError(`${res}`)
    })
  }

  /**
   * Callback function for showing the data of a row in a fullscreen dialog.
   *
   * ```ts
   * type RowType = {
   *    event: Event
   *    index: number
   *    rowData: any
   * }
   * ```
   */
  handleRowClick = (row: any) => {
    const singleRow = { ...row, state: {} }
    this.setState({ docOpen: true, singleRow })
  }

  /**
   * Install the **resize event** before the component is loaded.
   */
  UNSAFE_componentWillMount() {
    this.updateHeight()
  }

  /**
   * Install the **resize event** when the component is loaded.
   */
  componentDidMount() {
    window.addEventListener('resize', this.updateHeight)
  }

  /**
   * Remove **resize event** when the component expires.
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight)
  }

  /**
   * Render function
   *
   * Dialog title
   */
  render() {
    const {
      handleRowClick, handleClose, getRows, props, setState, state,
      handleSubmission
    } = this
    const { docOpen } = state
    const { classes, def: page } = props
    const rows = getSortedRows(page, getRows())

    if (rows) {
      const columns = getVirtualizedTableColumns(page, rows)
      applyDefaultSubmissionCallback(page, handleSubmission)
      return ( // 140
        <React.Fragment>
          <Paper style={{height: getHeight(127), width: '100%'}}>
            <VirtualizedTable
              rowCount={rows.length}
              rowGetter={({ index }:{index: number}) => filterRow(page, rows, index)}
              onRowClick={(row: any) => handleRowClick(row)}
              columns={columns}
            />
          </Paper>
          <Pagination endpoint={page.contentEndpoint} />
          <TableDialog
            open={docOpen}
            def={page}
            onClose={handleClose}
            parentState={{state, setState}}
            classes={classes}
          />
        </React.Fragment>
      )
    }

    // Renders an empty table when failed to fetch data
    return (
      <React.Fragment>
        <Paper className={classes.paper}
          style={{height: getHeight(80), width: '100%', }}
        >
          <div className={classes.centeredText}>No Data!</div>
        </Paper>
      </React.Fragment>
    )
  }

}

export default connect(null, mapDispatchToProps)
(withStyles(styles)(Table))
