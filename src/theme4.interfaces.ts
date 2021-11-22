
interface IStateThemePaletteColor {
  /** CSS color value */
  light?: string
  /** CSS color value */
  main?: string
  /** CSS color value */
  dark?: string
  /** CSS color value */
  contrastText?: string
}

interface IStateThemePalette {
  common?: {
    /** default is '#000' */
    black?: string
    /** default is '#fff' */
    white?: string
  }

  /** 'light' or 'dark' */
  type?: 'light' | 'dark'

  /**
   * Defaults:
   * 
   * ```ts
   * const light = {
   *   light: '#7986cb',
   *   main: '#3f51b5',
   *   dark: '#303f9f',
   *   contrastText: '#fff'
   * };
   * ```
   */
  primary?: IStateThemePaletteColor

  /**
   * Defaults:
   * 
   * ```ts
   * const light = {
   *   light: '#ff4081',
   *   main: '#f50057',
   *   dark: '#c51162',
   *   contrastText: '#fff'
   * };
   * ```
   */
  secondary?: IStateThemePaletteColor

  /**
   * Defaults:
   * 
   * ```ts
   * const light = {
   *   light: '#e57373',
   *   main: '#f44336',
   *   dark: '#d32f2f',
   *   contrastText: '#fff'
   * };
   * ```
   */
  error?: IStateThemePaletteColor

  /**
   * Defaults:
   * 
   * ```ts
   * const light = {
   *   light: '#ffb74d',
   *   main: '#ff9800',
   *   dark: '#f57c00',
   *   contrastText: 'rgba(0, 0, 0, 0.87)'
   * };
   * ```
   */
  warning?: IStateThemePaletteColor

  /**
   * Defaults:
   * 
   * ```ts
   * const light = {
   *   light: '#64b5f6',
   *   main: '#2196f3',
   *   dark: '#1976d2',
   *   contrastText: '#fff'
   * };
   * ```
   */
  info?: IStateThemePaletteColor

  /**
   * Defaults:
   * 
   * ```ts
   * const light = {
   *   light: '#81c784',
   *   main: '#4caf50',
   *   dark: '#338e3c',
   *   contrastText: 'rgba(0, 0, 0, 0.87)'
   * };
   * ```
   */
  success?: IStateThemePaletteColor

  grey?: {

    /**
     * Default is '#fafafa'  
     */
    50?: string
  
    /**
     * Default is '#f5f5f5'  
     */
    100?: string
  
    /**
     * Default is '#eeeeee'  
     */
    200?: string
  
    /**
     * Default is '#e0e0e0'  
     */
    300?: string
  
    /**
     * Default is '#bdbdbd'  
     */
    400?: string
  
    /**
     * Default is '#9e9e9e'  
     */
    500?: string
  
    /**
     * Default is '#757575'  
     */
    600?: string
  
    /**
     * Default is '#616161'  
     */
    700?: string
  
    /**
     * Default is '#424242'  
     */
    800?: string
  
    /**
     * Default is '#212121'  
     */
    900?: string
  
    /**
     * Default is '#d5d5d5'  
     */
    A100?: string
  
    /**
     * Default is '#aaaaaa'  
     */
    A200?: string
  
    /**
     * Default is '#303030'  
     */
    A400?: string
  
    /**
     * Default is '#616161'  
     */
    A700?: string
  }

  /** Default is 3 */
  contrastThreshold?: number

  /** Not available */
  // getContrastText?: 'N/A'
  /** Not available */
  // augmentColor?: 'N/A'

  /** Default is 0.2 */
  tonalOffset?: number

  text?: {

    /**
     * Defaults:
     * 
     * light = 'rgba(0, 0, 0, 0.87)'  
     * dark  = '#fff'
     */
    primary?: string
  
    /**
     * Defaults:
     * 
     * light = 'rgba(0, 0, 0, 0.54)'  
     * dark  = 'rgba(255, 255, 255, 0.7)'
     */
    secondary?: string
  
    /**
     * Defaults:
     * 
     * light = 'rgba(0, 0, 0, 0.38)'  
     * dark  = 'rgba(255, 255, 255, 0.5)'
     */
    disabled?: string

    /**
     * Defaults:
     * 
     * light = rgba(0, 0, 0, 0.38)
     * dark  = 'rgba(255, 255, 255, 0.5)'
     */
    hint?: string

    /**
     * Default dark is 'rgba(255, 255, 255, 0.5)'
     *
     * **Note:** `icon` is only available in dark the theme.
     */
    icon?: string

    /**
     * Defaults:
     * 
     * light = 'rgba(0, 0, 0, 0.12)'
     * dark  = 'rgba(255, 255, 255, 0.12)'
     */
    divider?: string
  }

  /** Default is 'rgba(0, 0, 0, 0.12)' */
  divider?: string

  background?: {

    /**
     * Defaults:
     * 
     * light = '#fff'  
     * dark  = '#424242'
     */
    paper?: string
  
    /**
     * Defaults:
     * 
     * light = '#fafafa'  
     * dark  = '#303030'
     */
    default?: string
  }

  action?: {

    /**
     * Defaults:
     * 
     * light = 'rgba(0, 0, 0, 0.54)'  
     * dark  = '#fff'
     */
    active?: string

    /**
     * Defaults:
     * 
     * light = 'rgba(0, 0, 0, 0.04)'  
     * dark  = 'rgba(255, 255, 255, 0.08)'
     */
    hover?: string

    /**
     * Defaults:
     *
     * light = 0.04  
     * dark  = 0.08
     */
    hoverOpacity?: number

    /**
     * Defaults:
     *
     * light = 'rgba(0, 0, 0, 0.08)'  
     * dark  = 'rgba(255, 255, 255, 0.16)'
     */
    selected?: string

    /**
     * Defaults:
     *
     * light = 0.08  
     * dark  = 0.16
     */
    selectedOpacity?: number

    /**
     * Defaults
     *
     * light = 'rgba(0, 0, 0, 0.26)'  
     * dark  = 'rgba(255, 255, 255, 0.3)'
     */
    disabled?: string

    /**
     * Defaults:
     * 
     * light = 'rgba(0, 0, 0, 0.12)'  
     * dark  = 'rgba(255, 255, 255, 0.12)'
     */
    disabledBackground?: string

    /** Default is 0.38 */
    disabledOpacity?: number

    /**
     * Defaults:
     * 
     * light = 'rgba(0, 0, 0, 0.12)'  
     * dark  = 'rgba(255, 255, 255, 0.12)'
     */
    focus?: string

    /** Default is 0.12 */
    focusOpacity?: number

    /** 
     * Defaults:
     * 
     * light = 0.12  
     * dark = 0.24
     */
    activatedOpacity?: number
  }
} // END of IStateThemePaletter

interface IStateThemeTypographyHeading {

  /**
   * Example:
   * 
   * '"Roboto", "Helvetica, "Arial", sans-serif'
   */
  fontFamily?: string

  /** Example: 300 */
  fontWeight?: number
  /** Example: 6rem */
  fontSize?: string
  /** Example: 1.167 */
  lineHeight?: number
  /** Example: '-0.01562em' */
  letterSpacing?: string
}

interface IStateThemeTypographyButton
    extends IStateThemeTypographyHeading {
  textTransform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none' | 'full-width' | 'full-size-kana'
}

interface IStateThemeTypography {
  /** Default is 16 */
  htmlFontSize?: number

  /**
   * Default:
   * 
   * '"Roboto", "Helvetica, "Arial", sans-serif'
   */
  fontFamily?: string

  /** Default is 14 */
  fontSize?: number
  /** Default is 300 */
  fontWeightLight?: number
  /** Default is 400 */
  fontWeightRegular?: number
  /** Default is 500 */
  fontWeightMedium?: number
  /** Default is 700 */
  fontWeightBold?: number

  /**
   * Default:
   * 
   * ```ts
   * const h1 = {
   *   fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
   *   fontWeight: 300
   *   fontSize: '6rem',
   *   lineHeight: 1.167
   *   letterSpacing: '-0.01562em'
   * };
   * ```
   */
  h1?: IStateThemeTypographyHeading

  /**
   * Default:
   * 
   * ```ts
   * const h2 = {
   *   fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
   *   fontWeight: 300
   *   fontSize: '3.75rem',
   *   lineHeight: 1.2
   *   letterSpacing: '-0.00833em'
   * };
   * ```
   */
  h2?: IStateThemeTypographyHeading

  /**
   * Default:
   * 
   * ```ts
   * const h3 = {
   *   fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
   *   fontWeight: 400
   *   fontSize: '3rem',
   *   lineHeight: 1.167
   *   letterSpacing: '0em'
   * };
   * ```
   */
  h3?: IStateThemeTypographyHeading

  /**
   * Default:
   * 
   * ```ts
   * const h4 = {
   *   fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
   *   fontWeight: 400
   *   fontSize: '2.125rem',
   *   lineHeight: 1.235
   *   letterSpacing: '0.00735em'
   * };
   * ```
   */
  h4?: IStateThemeTypographyHeading

  /**
   * Default:
   * 
   * ```ts
   * const h5 = {
   *   fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
   *   fontWeight: 400
   *   fontSize: '1.5rem',
   *   lineHeight: 1.334
   *   letterSpacing: '0em'
   * };
   * ```
   */
  h5?: IStateThemeTypographyHeading

  /**
   * Default:
   * 
   * ```ts
   * const h6 = {
   *   fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
   *   fontWeight: 500
   *   fontSize: '1.25rem',
   *   lineHeight: 1.6
   *   letterSpacing: '0.0075em'
   * };
   * ```
   */
  h6?: IStateThemeTypographyHeading

  /**
   * Default:
   * 
   * ```ts
   * const subtitle1 = {
   *   fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
   *   fontWeight: 400
   *   fontSize: '1rem',
   *   lineHeight: 1.75
   *   letterSpacing: '0.00938em'
   * };
   * ```
   */
  subtitle1?: IStateThemeTypographyHeading

  /**
   * Default:
   * 
   * ```ts
   * const subtitle2 = {
   *   fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
   *   fontWeight: 500
   *   fontSize: '0.875rem',
   *   lineHeight: 1.57
   *   letterSpacing: '0.00714em'
   * };
   * ```
   */
  subtitle2?: IStateThemeTypographyHeading

  /**
   * Default:
   * 
   * ```ts
   * const body1 = {
   *   fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
   *   fontWeight: 400
   *   fontSize: '1rem',
   *   lineHeight: 1.5
   *   letterSpacing: '0.00938em'
   * };
   * ```
   */
  body1?: IStateThemeTypographyHeading

  /**
   * Default:
   * 
   * ```ts
   * const body2 = {
   *   fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
   *   fontWeight: 400
   *   fontSize: '0.875rem',
   *   lineHeight: 1.43
   *   letterSpacing: '0.01071em'
   * };
   * ```
   */
  body2?: IStateThemeTypographyHeading

  /**
   * Default:
   * 
   * ```ts
   * const button = {
   *   fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
   *   fontWeight: 500
   *   fontSize: '0.875rem',
   *   lineHeight: 1.75
   *   letterSpacing: '0.02857em'
   *   textTransform: 'uppercase'
   * };
   * ```
   */
  button?: IStateThemeTypographyButton

  /**
   * Default:
   * 
   * ```ts
   * const caption = {
   *   fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
   *   fontWeight: 400
   *   fontSize: '0.75rem',
   *   lineHeight: 1.66
   *   letterSpacing: '0.03333em'
   * };
   * ```
   */
  caption?: IStateThemeTypographyHeading

  /**
   * Default:
   * 
   * ```ts
   * const overline = {
   *   fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
   *   fontWeight: 400
   *   fontSize: '0.75rem',
   *   lineHeight: 2.66
   *   letterSpacing: '0.08333em'
   *   textTransform: 'uppercase'
   * };
   * ```
   */
  overline?: IStateThemeTypographyButton
} // END of IStateThemeTypography

/**
 * @see https://mui.com/customization/default-theme/
 */
export interface IStateTheme {
  breakpoints?: {
    values?: {

      /** Default is 0 */
      xs?: number

      /** Default is 600 */
      sm?: number

      /** Default is 960 */
      md?: number

      /** Default is 1280 */
      lg?: number
    
      /** Default is 1920 */
      xl?: number
    }

  }

  /** 'ltr' or 'rtl' */
  direction?: 'ltr' | 'rtl'
  palette?: IStateThemePalette

  /**
   * Shadow example:
   * 
   * [ "0px 2px 1px -1px rgba(0,0,0,0.2), 0px, 1px, 1px, 0px" ]
   */
  shadows?: string[]

  typography?: IStateThemeTypography

  shape?: {
    /** Default is 4 */
    borderRadius?: number
  }

  transitions?: {
    easing?: {
      /** Default is 'cubic-bezier(0.4, 0, 0.2, 1)' */
      easeInOut?: string
      /** Default is 'cubic-bezier(0.0, 0, 0.2, 1)' */
      easeOut?: string
      /** Default is 'cubic-bezier(0.4, 0, 1, 1)' */
      easeIn?: string
      /** Default is 'cubic-bezier(0.4, 0, 0.6, 1)' */
      sharp?: string
    }
    duration?: {
      /** Default is 150 */
      shorest?: number
      /** Default is 200 */
      shorter?: number
      /** Default is 250 */
      short?: number
      /** Default is 300 */
      standard?: number
      /** Default is 375 */
      complex?: number
      /** Default is 225 */
      enteringScreen?: number
      /** Default is 195 */
      leavingScreen?: number
    }
  }

  zIndex?: {
    /** Default is 1000 */
    mobileStepper?: number
    /** Default is 1050 */
    speedDial?: number
    /** Default is 1100 */
    appBar?: number
    /** Default is 1200 */
    drawer?: number
    /** Default is 1300 */
    modal?: number
    /** Default is 1400 */
    snackbar?: number
    /** Default is 1500 */
    tooltip?: number
  }
}
