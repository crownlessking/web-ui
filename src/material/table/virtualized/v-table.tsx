import React, { PureComponent, ReactNode } from 'react'
import classNames from 'classnames'
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel, { TableSortLabelProps } from '@material-ui/core/TableSortLabel'

// [TODO] No pagination is available for the virtualized table.
//        The module developer suggests using InfiniteLoader to load data
//        in chunks from the server.
// @see https://github.com/bvaughn/react-virtualized/issues/24#issuecomment-185510467
import {
  AutoSizer, Column, SortDirection, Table, ColumnProps, TableCellRenderer,
  TableHeaderProps, TableProps
} from 'react-virtualized'

const styles = ({palette, typography}: Theme) => createStyles({
  table: {
    fontFamily: typography.fontFamily,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
})

/**
 * @see https://stackoverflow.com/questions/49285864/is-there-a-valueof-similar-to-keyof-in-typescript
 */
interface IDirection {
  [key: string]: TableSortLabelProps['direction']
}

interface ITableHeaderProps extends TableHeaderProps {
  columnIndex: number
}

interface IGetRowClassName {
  index: number
}

interface ICellRendererParam {
  cellData?: ReactNode
  columnIndex: number
}

interface IColumnProps extends ColumnProps {
  cellContentRenderer?: TableCellRenderer | null
  numeric?: boolean
}

class MuiVirtualizedTable extends PureComponent<TableProps> {

  static defaultProps = {
    headerHeight: 56,
    rowHeight: 56,
    rowClassName: '',
    sort: undefined
  }

  /**
   * 
   */
  getRowClassName = ({ index }: IGetRowClassName) => {
    const { classes, rowClassName, onRowClick } = this.props

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    })
  }

  /**
   * Handles 
   * If `rowHeight` is a function
   */
  getRowHeight = () => {
    const { rowHeight } = this.props
    if (typeof rowHeight === 'function') {
      return MuiVirtualizedTable.defaultProps.rowHeight
    }
    return rowHeight
  }

  cellRenderer = ({ cellData, columnIndex }: ICellRendererParam) => {
    const { columns, classes, onRowClick } = this.props
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: this.getRowHeight() }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        { cellData }
      </TableCell>
    )
  }

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection = 'ASC' }: ITableHeaderProps) => {
    const { headerHeight, columns, classes, sort } = this.props;
    const direction: IDirection = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc',
    }

    const inner =
      !columns[columnIndex].disableSort && sort != null ? (
        <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
          { label }
        </TableSortLabel>
      ) : (
        label
      )

    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        { inner }
      </TableCell>
    )
  }

  render() {
    const { classes, columns, ...tableProps } = this.props
    return (
      <AutoSizer>
        {({ height, width }: {height: number; width: number}) => (
          <Table
            className={classes.table}
            {...tableProps}
            height={height}
            width={width}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ cellContentRenderer = null, className, dataKey, ...other }: IColumnProps, index: number) => {
              let renderer
              if (cellContentRenderer != null) {
                renderer = (cellRendererProps: any) =>
                  this.cellRenderer({
                    cellData: cellContentRenderer(cellRendererProps),
                    columnIndex: index,
                  })
              } else {
                renderer = this.cellRenderer
              }

              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classNames(classes.flexContainer, className)}
                  cellRenderer={renderer}
                  dataKey={dataKey}
                  {...other}
                />
              )
            })}
          </Table>
        )}
      </AutoSizer>
    )
  }

}

export default withStyles(styles)(MuiVirtualizedTable)
