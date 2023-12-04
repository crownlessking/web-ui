import { useReducer, useEffect, useState } from 'react'

const loadedProperty = '__loaded'

type TAction = { i: number; type: string }
type TWithAttachment<T=any> = {
  __loaded: boolean
  data: T
  done: () => number
}

const reducer = (state: TWithAttachment[], { i, type }: TAction) => {
  switch (type) {
    case 'ready':
      const copy = [...state]
      copy[i][loadedProperty] = true
      return copy
    default:
      return state
  }
}

const defaults: {
  reducer?: typeof reducer
} = {}

export const useSequentialRenderer = (
  input: TWithAttachment[],
  options = defaults
): TWithAttachment[] => {
  const [state, dispatch] = useReducer(options.reducer || reducer, input)

  const index = state.findIndex(a => !a[loadedProperty])
  const sliced = index < 0 ? state.slice() : state.slice(0, index + 1)

  const items = sliced.map((item, i) => {
    return {...item, done: () => {
      dispatch({ type: 'ready', i })
      return i
    }}
  })

  return items
}

const Attachment = ({ children, done }: any) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const delay = Math.random() * 3000
    const timer = setTimeout(() => {
      setLoaded(true)
      done()
    }, delay)
    setLoaded(true)
    return () => clearTimeout(timer)
  }, [done])

  return <>{ loaded ? children : /*loading...*/( null ) }</>
}

interface IAttachmentsProps<T> {
  children: T[]
}

export function RenderSequentially<T=any>(props: IAttachmentsProps<T>) {
  const withMetadata = props.children.map(data => ({
    __loaded: false,
    data,
    done: () => { return -1 }
  } as TWithAttachment<T>));
  const items = useSequentialRenderer(withMetadata)

  return (
    <>
      {items.map((attachment, i) => {
        return (
          <Attachment key={`attachment-${i}`} done={() => attachment.done()}>
            { attachment.data }
          </Attachment>
        )
      })}
    </>
  )
}
