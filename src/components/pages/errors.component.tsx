import { useState } from 'react'
import {
  CardContent, CssBaseline, Grid, Paper, SxProps, Typography
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

type TSetLastSelected = <T>($class: T) => void 

interface IHive {
  selected_id?: string
  setSelected?: TSetLastSelected
  setDetail?: (detail: IJsonapiError['detail']) => void
}

interface IErrorListItemProp {
  errorJson: IJsonapiError
  hive: IHive // data shared between detail & error components
}

const listSx: SxProps = {
  height:'100vh',
  borderRight:'1px solid #afafaf',
  overflowY:'scroll'
}

const useStyles = makeStyles(() => ({
  errorCardHover: {
    '&:hover': {
      backgroundColor: '#f0f8ff',
      cursor: 'pointer'
    },
  },
  errorCardClicked: {
    '&:hover': {
      backgroundColor: '#f0f8ff',
      cursor: 'pointer'
    },
    backgroundColor: '#d7ecff !important'
  }
}))

function ErrorListItem({ errorJson, hive }: IErrorListItemProp): JSX.Element {
  const error = new JsonapiError(errorJson)
  const classes = useStyles()
  type TClasses = keyof typeof classes
  const [ $class, setClass ] = useState<TClasses>('errorCardHover')

  const onPaperClick = (e: any) => {
    if (error.id !== hive.selected_id) {
      hive.setSelected && hive.setSelected<TClasses>('errorCardHover')
      setClass('errorCardClicked')
      hive.setDetail && hive.setDetail(error.detail)
      hive.selected_id = error.id
      hive.setSelected = setClass as TSetLastSelected
    }
  }

  return (
    <Paper square className={classes[$class]} onClick={onPaperClick}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {error.id}:{error.code}
        </Typography>
        <Typography variant='subtitle2' component='div'>{error.title}</Typography>
      </CardContent>
    </Paper>
  )
}

function ErrorDetail({ hive }: { hive: IHive}): JSX.Element {
  const [ detail, setDetail ] = useState<IJsonapiError['detail']>('')
  hive.setDetail = setDetail
  return (
    <Grid xs={true} sx={{height:'100vh'}} item>
      { detail }
    </Grid>
  )
}

export default function PageErrors({ def: page }: IPageErrorsProps) {
  // const errors = useSelector((state: RootState) => state.errors)
  const errors: IJsonapiError[] = [
    {
      code: Date.now().toString(),
      title: 'Loren ipsum',
      detail: `(1) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma',
      detail: `(2) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
    {
      code: Date.now().toString(),
      title: 'Loren ipsum',
      detail: `(3) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma',
      detail: `(4) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
    {
      code: Date.now().toString(),
      title: 'Loren ipsum',
      detail: `(5) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma',
      detail: `(6) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
    {
      code: Date.now().toString(),
      title: 'Loren ipsum',
      detail: `(7) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma',
      detail: `(8) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
    {
      code: Date.now().toString(),
      title: 'Loren ipsum',
      detail: `(9) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma',
      detail: `(10) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
    {
      code: Date.now().toString(),
      title: 'Loren ipsum',
      detail: `(11) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma',
      detail: `(12) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
    {
      code: Date.now().toString(),
      title: 'Loren ipsum',
      detail: `(13) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma',
      detail: `(14) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
    {
      code: Date.now().toString(),
      title: 'Loren ipsum',
      detail: `(15) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
    {
      code: Date.now().toString(),
      title: 'Vas nimma',
      detail: `(16) Uncaught Error: need a stack trace... sorry.
      at err (index.ts:32:1)
      at ErrorItem (errors.component.tsx:66:1)
      at renderWithHooks (react-dom.development.js:14968:1)
      at updateFunctionComponent (react-dom.development.js:17336:1)
      at beginWork (react-dom.development.js:19047:1)
      at HTMLUnknownElement.callCallback (react-dom.development.js:3929:1)
      at Object.invokeGuardedCallbackDev (react-dom.development.js:3978:1)
      at invokeGuardedCallback (react-dom.development.js:4040:1)
      at beginWork$1 (react-dom.development.js:23946:1)
      at performUnitOfWork (react-dom.development.js:22760:1)`
    },
  ]

  let i = 0
  while (i < errors.length) {
    errors[i].id = ''+i
    i++
  }

  const hive: IHive = { }

  return (
    <Fragment>
      <CssBaseline />
      <Grid container spacing={0}>
        <Grid md={3} sx={listSx} item>
          {errors.map((e, i) => (
            <ErrorListItem key={`e-${i}`} errorJson={e} hive={hive} />
          ))}
        </Grid>
        <ErrorDetail hive={hive} />
      </Grid>
    </Fragment>
  )
}
