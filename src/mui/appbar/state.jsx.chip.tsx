import Chip from '@mui/material/Chip'
import { useDispatch, useSelector } from 'react-redux'
import { get_base_route } from 'src/controllers'
import store, { AppDispatch, RootState, actions, IRedux } from '../../state'
import StateFormItemCustomChip from '../../controllers/templates/StateFormItemCustomChip'

interface IStateJsxChipProps {
  def: StateFormItemCustomChip<any>[]
}

export function StateJsxChip ({ def: chips }: IStateJsxChipProps) {
  const dispatch = useDispatch<AppDispatch>()
  const rawRoute = useSelector((rootState: RootState) => rootState.app.route)
  const chipState = useSelector((rootState: RootState) => rootState.chip)
  const baseRoute = get_base_route(rawRoute)
  const redux = { store, dispatch, actions, route: baseRoute } as IRedux

  // [TODO] chips can contain chip that are incomplete, and should not be rendered
  //        You need to retrieve the chips remaining from the redux store if it exists
  const fixedChips = chips.map(chip => {
    const cState = chipState[chip.label]
    return new StateFormItemCustomChip({
      ...chip,
      ...cState,
    }, {})
  })

  return (
    <>
      {fixedChips.map((chip, i) => (
        <Chip
          {...chip.props}
          key={`appbar-midsearch-input-chip-${i}`}
          label={chip.label}
          variant={chip.variant}
          color={chip.color}
          onClick={chip.onClick(redux)}
          onDelete={chip.onDelete(redux)}
        />
      ))}
    </>
  )

}