import { getVal, setVal } from '.'
import IStatePage from './interfaces/IStatePage'
import StatePageAppBar from './StatePageAppBar'
import StateTypography from './StateTypography'

export default class StatePageAppBarTypography
  extends StateTypography<StatePageAppBar>
{
  patchStatePageAppBarTypography (page: IStatePage): void {
    const fontColor = getVal(page, 'appBar.typography.color')
  
    if (!fontColor) {
      setVal(page, 'appBar.typography.color', 'inherit')
    }
  }  
}
