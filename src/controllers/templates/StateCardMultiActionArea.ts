import IStateCard from '../../interfaces/IStateCard'
import StateCard from '../StateCard'

export default class StateCardMultiActionArea extends StateCard {
  get props(): Required<IStateCard>['props'] {
    return {
      sx: {
        maxWidth: 345,
      },
      ...this.cardState.props
    }
  }
  get mediaProps(): Required<IStateCard>['mediaProps'] {
    return {
      component: 'img',
      width: '100%',
      height: 'auto',
      alt: 'Image',
      ...this.cardState.mediaProps
    }
  }

}