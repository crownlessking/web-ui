import { styled, alpha } from '@mui/material'
import StateComponent from '../controllers/StateComponent'
import ThemeParser from '../controllers/ThemeParser'

interface IProps {
  def: StateComponent<any> | StateComponent<any>[]
}

export default function CascadingComponent({ def: component }: IProps) {
  const factory = new ThemeParser({ alpha })
  const parse   = factory.getParser()

  if (Array.isArray(component)) {
    return component.map((c, i) => {
      const C = styled(c.tag)(
        ({ theme }) => parse(theme, c.theme)
      )
      return c.hasChildren ? (
        <C {...c.props} key={`c-${i}`}>
          { CascadingComponent(c.children) }
        </C>
      ) : (
        <C {...c.props} />
      )
    })
  } else {
    const Comp = styled(component.tag)(
      ({ theme }) => parse(theme, component.theme)
    )
    return component.hasChildren ? (
      <Comp {...component.props}>
        { CascadingComponent(component.children) }
      </Comp>
    ) : (
      <Comp {...component.props} />
    )
  }
}
