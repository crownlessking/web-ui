import { set_val } from '..'
import IStatePage from '../interfaces/IStatePage'
import StatePageAppBar from './StatePageAppBar'
import StateTypography from '../StateTypography'

export default class StatePageAppBarTypography
  extends StateTypography<StatePageAppBar>
{
  patchStatePageAppBarTypography (page: IStatePage): void {
    const fontColor = page.appBar?.typography?.color
    if (!fontColor) {
      set_val(page, 'appBar.typography.color', 'inherit')
    }
  } 
}
