import { set_val } from '..';
import IStatePage from '../../interfaces/IStatePage';
import StateTypography from '../StateTypography';
import StateAppbar from '../StateAppbar';
import StatePage from '../StatePage';

export default class StatePageAppbarTypography
  extends StateTypography<StateAppbar<StatePage>>
{
  patchStatePageAppbarTypography (page: IStatePage): void {
    const fontColor = page.appbar?.typography?.color;
    if (!fontColor) {
      set_val(page, 'appbar.typography.color', 'inherit');
    }
  }
}
