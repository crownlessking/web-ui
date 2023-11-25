import { ThemeOptions, PaletteOptions } from '@mui/material/styles'

/** @deprecated */
type TMode = PaletteOptions['mode'] // 'light' | 'dark'

/** @deprecated */
let themeMode: TMode = 'light'

/**
 * Return app custom theme
 * @deprecated
 */
export default function tuber_get_theme(mode?: TMode): ThemeOptions {
  return {
    'components': {
      'MuiDrawer': {
        'styleOverrides': {
          'paper': {
            'backgroundColor': '#141a1f',
            'borderLeft': 'none',
            'borderRight': 'none'
          },
        },
      },
      'MuiAppBar': {
        'styleOverrides': {
          'colorPrimary': {
            'color': '#000000de', //
            'backgroundColor': '#141a1f'
          },
        },
      },
      'MuiDialogContentText': {
        'styleOverrides': {
          'root': {
            'paddingTop': 8
          }
        }
      },
      'MuiButton': {
        'styleOverrides': {
          'root': {
            'textTransform': 'none',
            'fontSize': '1rem'
          }
        }
      }
    },
    'palette': {
      'mode': mode,
      'background': {
        'default': s('#f0f0f0')
      }
    },
    'typography': {
      'fontFamily': '\'Quicksand\', sans-serif'
    }
  }
}

/**
 * Automatically switch between colors depending on the theme mode.
 * @param light light theme color
 * @param dark dark theme color
 * @returns The string of either the light or dark theme or undefined if the
 * dark theme color is not defined.
 * @deprecated
 */
function s(light: string, dark?: string): string|undefined {
  return themeMode === 'light' ? light : dark
}

/**
 * Change the theme mode e.g. light or dark.
 * @param mode light or dark
 * @returns void
 * @deprecated
 */
export function set_theme_mode(mode: TMode) {
  themeMode = mode
}

/** @see https://www.quackit.com/css/css_color_codes.cfm */
export function get_ratio_color (upvotes?: string, downvotes?: string) {
  const up = parseInt(upvotes || '0')
  const down = parseInt(downvotes || '0')
  if (!up && !down) { // no votes
    return 'inherit'
  }
  const good = .1
  const high = .25
  const average = .5
  const low = .75
  const bad = .9
  if (up * good >= down) {
    return 'green'
  }
  if (up * high >= down) {
    return 'seagreen'
  }
  if (up * average >= down) {
    return 'olivedrab'
  }
  if (up * low >= down) {
    return 'olive'
  }
  if (up * bad >= down) {
    return 'darkgoldenrod'
  }
  if (up >= down) {
    return 'darkgoldenrod'
  }
  if (up >= down * bad) {
    return 'darkgoldenrod'
  }
  if (up >= down * low) {
    return 'darksalmon'
  }
  if (up >= down * average) {
    return 'salmon'
  }
  if (up >= down * high) {
    return 'tomato'
  }
  if (up >= down * good) {
    return 'orangered'
  }

  return 'red'
}
