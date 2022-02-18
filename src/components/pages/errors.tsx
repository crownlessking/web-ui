import { useState } from 'react'
import {
  Card, CardContent, CssBaseline, Grid, Paper, SxProps, Typography
} from '@mui/material'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { IJsonapiError } from '../../controllers/interfaces/IStateNet'
import JsonapiError from '../../controllers/JsonapiError'
import StatePage from '../../controllers/StatePage'
import { RootState } from '../../state'
import { makeStyles } from '@mui/styles'

interface IPageErrorsProps {
  def: StatePage
}

interface IErrorItemProps {
  state: {
    e: IJsonapiError
    index: number
    clicked?: string|number
    setClicked: (s?: string|number)=>void
  }
}

const listSx: SxProps = {
  height:'100vh',
  borderRight:'1px solid #afafaf',
  overflowY:'scroll'
}

const useStyles = makeStyles(() => ({
  errorCardHover: {
    '&:hover': {
      backgroundColor: '#e0e0e0',
      cursor: 'pointer'
    },
    // '&:active': {
    //   backgroundColor: 'lightskyblue'
    // }
  },
  errorCardClicked: {
    '&:hover': {
      backgroundColor: '#e0e0e0',
      cursor: 'pointer'
    },
    backgroundColor: 'lightskyblue !important'
  }
}))

function ErrorItem({ state: { e, index, clicked, setClicked } }: IErrorItemProps): JSX.Element {
  const error = new JsonapiError(e)
  const classes = useStyles()
  const onPaperClick = (e: any) => setClicked(index)
  const $classes: keyof typeof classes = (index === clicked)
    ? 'errorCardClicked'
    : 'errorCardHover'

  return (
    <Paper square className={classes[$classes]} onClick={onPaperClick}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {error.code}
        </Typography>
        <Typography variant='subtitle2' component='div'>{error.title}</Typography>
      </CardContent>
    </Paper>
  )
}

export default function PageErrors({ def: page }: IPageErrorsProps) {
  // const errors = useSelector((state: RootState) => state.errors)
  const errors: IJsonapiError[] = [
    {
      code: Date.now().toString(),
      title: 'Loren ipsum'
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma'
    },
    {
      code: Date.now().toString(),
      title: 'Loren ipsum'
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma'
    },
    {
      code: Date.now().toString(),
      title: 'Loren ipsum'
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma'
    },
    {
      code: Date.now().toString(),
      title: 'Loren ipsum'
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma'
    },
    {
      code: Date.now().toString(),
      title: 'Loren ipsum'
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma'
    },
    {
      code: Date.now().toString(),
      title: 'Loren ipsum'
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma'
    },
    {
      code: Date.now().toString(),
      title: 'Loren ipsum'
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma'
    },
    {
      code: Date.now().toString(),
      title: 'Loren ipsum'
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma'
    },
  ]

  const [selected, setSelected] = useState<string|number>()
  return (
    <Fragment>
      <CssBaseline />
      <Grid container spacing={0}>
        <Grid md={3} sx={listSx} item>
          {errors.map((e, i) => (
            <ErrorItem
              key={`e-${i}`}
              state={{ e, index: i, clicked: selected, setClicked: setSelected}}
            />
          ))}
        </Grid>
        <Grid xs={true} sx={{height:'100vh'}} item />
      </Grid>
    </Fragment>
  )
}
