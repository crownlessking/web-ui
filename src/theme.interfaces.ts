
/** Material UI breakpoint keys */
export type TStateThemeBreakpointsKeys = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface IStateThemePaletteColor {
  /** CSS color value */
  main?: string
  /** CSS color value */
  light?: string
  /** CSS color value */
  dark?: string
  /** CSS color value */
  contrastText?: string
}

export interface IStateThemePalette {
  /** 'light' or 'dark' */
  mode?: 'light' | 'dark'

  common?: {
    /** default is '#000' */
    black?: string
    /** default is '#fff' */
    white?: string
  }

  /**
   * Defaults:
   * 
   * ```ts
   * const light = {
   *   main: '#1976d2',
   *   light: '#42a5f5',
   *   dark: '#1565c0',
   *   contrastText: '#fff'
   * };
   * const dark = {
   *   main: '#90caf9',
   *   light: '#e3f2d2',
   *   dark: '#42a5f5',
   *   contrastText: 'rgba(0, 0, 0, 0.87)'
   * };
   * ```
   */
  primary?: IStateThemePaletteColor

  /**
   * Defaults:
   * 
   * ```ts
   * const light = {
   *   main: '#9c27b0',
   *   light: '#ba68c8',
   *   dark: '#7b1fa2',
   *   contrastText: '#fff'
   * };
   * const dark = {
   *   main: '#ce93d8',
   *   light: '#f3e5f5',
   *   dark: '#ab47bc',
   *   contrastText: 'rgba(0, 0, 0, 0.87)'
   * };
   * ```
   */
  secondary?: IStateThemePaletteColor

  /**
   * Defaults:
   * 
   * ```ts
   * const light = {
   *   main: '#d32f2f',
   *   light: '#ef5350',
   *   dark: '#c62828',
   *   contrastText: '#fff'
   * };
   * const dark = {
   *   main: '#f44336',
   *   light: '#e57373',
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
   *   main: '#ed6c02',
   *   light: '#ff9800',
   *   dark: '#e65100',
   *   contrastText: '#fff'
   * };
   * const dark = {
   *   main: '#ffa726',
   *   light: '#ffb74d',
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
   *   main: '#0288d1',
   *   light: '#03a9f4',
   *   dark: '#01579b',
   *   contrastText: '#fff'
   * };
   * const dark = {
   *   main: '#29b6f6',
   *   light: '#4fc3f7',
   *   dark: '#0288d1',
   *   contrastText: 'rgba(0, 0, 0, 0.87)'
   * };
   * ```
   */
  info?: IStateThemePaletteColor

  /**
   * Defaults:
   * 
   * ```ts
   * const light = {
   *   main: '#2e7d32',
   *   light: '#4caf50',
   *   dark: '#1b5e20',
   *   contrastText: '#fff'
   * };
   * const dark = {
   *   main: '#66bb6a',
   *   light: '#81c784',
   *   dark: '#388e3c',
   *   contrastText: 'rgba(0, 0, 0, 0.87)'
   * };
   * ```
   */
  success?: IStateThemePaletteColor

  grey?: {

    /**
     * Defaults:
     * 
     * light = '#fafafa'  
     * dark  = '#'
     */
    50?: string
  
    /**
     * Defaults:
     * 
     * light = '#f5f5f5'  
     * dark  = '#'
     */
    100?: string
  
    /**
     * Defaults:
     * 
     * light = '#eeeeee'  
     * dark  = '#'
     */
    200?: string
  
    /**
     * Defaults:
     * 
     * light = '#e0e0e0'  
     * dark  = '#'
     */
    300?: string
  
    /**
     * Defaults:
     * 
     * light = '#bdbdbd'  
     * dark  = '#'
     */
    400?: string
  
    /**
     * Defaults:
     * 
     * light = '#9e9e9e'  
     * dark  = '#'
     */
    500?: string
  
    /**
     * Defaults:
     * 
     * light = '#757575'  
     * dark  = '#'
     */
    600?: string
  
    /**
     * Defaults:
     * 
     * light = '#616161'  
     * dark  = '#'
     */
    700?: string
  
    /**
     * Defaults:
     * 
     * light = '#424242'  
     * dark  = '#'
     */
    800?: string
  
    /**
     * Defaults:
     * 
     * light = '#212121'  
     * dark  = '#'
     */
    900?: string
  
    /**
     * Defaults:
     * 
     * light = '#f5f5f5'  
     * dark  = '#'
     */
    A100?: string
  
    /**
     * Defaults:
     * 
     * light = '#eeeeee'  
     * dark  = '#'
     */
    A200?: string
  
    /**
     * Defaults:
     * 
     * light = '#bdbdbd'  
     * dark  = '#'
     */
    A400?: string
  
    /**
     * Defaults:
     * 
     * light = '#616161'  
     * dark  = '#'
     */
    A700?: string
  }

  /** Default is 3 */
  contrastThreshold?: number
  getContrastText?: Function
  augmentColor?: Function
  /** Default is 0.2 */
  tonalOffset?: number

  text?: {

    /**
     * Defaults:
     * 
     * light = 'rgba(0, 0, 0, 0.87)'  
     * dark  = ''
     */
    primary?: string
  
    /**
     * Defaults:
     * 
     * light = 'rgba(0, 0, 0, 0.6)'  
     * dark  = ''
     */
    secondary?: string
  
    /**
     * Defaults:
     * 
     * light = 'rgba(0, 0, 0, 0.12)'  
     * dark  = ''
     */
    disabled?: string
  }

  /** Default is 'rgba(0, 0, 0, 0.12)' */
  divider?: string

  background?: {

    /**
     * Defaults:
     * 
     * light = '#fff'  
     * dark  = ''
     */
    paper?: string
  
    /**
     * Defaults:
     * 
     * light = '#fff'  
     * dark  = ''
     */
    default?: string
  }

  action?: {
    /** Default is rgba(0, 0, 0, 0.54) */
    active?: string
    /** Default is rgba(0, 0, 0, 0.04) */
    hover?: string
    /** Default is 0.04 */
    hoverOpacity?: number
    /** Default is rgba(0, 0, 0, 0.08) */
    selected?: string
    /** Default is 0.08 */
    selectedOpacity?: number
    /** Default is rgba(0, 0, 0, 0.26) */
    disabled?: string
    /** Default is rgba(0, 0, 0, 0.12) */
    disabledBackground?: string
    /** Default is 0.38 */
    disabledOpacity?: number
    /** Default is rgba(0, 0, 0, 0.12) */
    focus?: string
    /** Default is 0.12 */
    focusOpacity?: number
    /** Default is 0.12 */
    activatedOpacity?: number
  }
}

export interface IStateThemeMixins {
  toolbar?: {
    /** Default is 56 */
    minHeight?: number,

    /** @media (min-width:0px) and (orientation: landscape) */
    //    minHeight: 48
    /** @media (min-width:600px) */
    //    minHeight: 64
    [media: number]: {
      minHeight?: number
    }
  }
}

export interface IStateThemeTypographyHeading {

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

export interface IStateThemeTypographyButton
    extends IStateThemeTypographyHeading {
  textTransform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none' | 'full-width' | 'full-size-kana'
}

export interface IStateThemeTypography {
  /** Default is 16 */
  htmlFontSize?: number
  /** Can be a function, an array, a number... */
  pxToRem?: any

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
   *   letterSpacing: '-0.00735em'
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
}

/**
 * @see https://mui.com/customization/default-theme/
 */
export interface IStateTheme {
  breakpoints?: {

    /** Sorry... I don't think changing that is a good idea. */
    keys?: 'N/A'
    values?: {
  
      /**
       * Defaults:
       *
       * light = 0  
       * dark  = 
       */
      xs?: number
    
      /**
       * Defaults:
       *
       * light = 600  
       * dark  = 
       */
      sm?: number
    
      /**
       * Defaults:
       *
       * light = 900  
       * dark  = 
       */
      md?: number
    
      /**
       * Defaults:
       *
       * light = 1200  
       * dark  =
       */
      lg?: number
    
      /**
       * Defaults:
       *
       * light = 1536  
       * dark  =
       */
      xl?: number
    }
  
    /**
     * 'xs' or 'sm' or 'md' or 'lg' or 'xl'
     */
    up?: TStateThemeBreakpointsKeys
  
    /**
     * 'xs' or 'sm' or 'md' or 'lg' or 'xl'
     */
    down?: TStateThemeBreakpointsKeys
  
    /**
     * 'xs' or 'sm' or 'md' or 'lg' or 'xl'
     */
    between?: TStateThemeBreakpointsKeys
  
    /**
     * 'xs' or 'sm' or 'md' or 'lg' or 'xl'
     */
    only?: TStateThemeBreakpointsKeys
  
    /**
     * 'px' or 'cm' or 'mm' or 'in' or 'pt' or 'pc'
     */
    unit?: 'px' | 'cm' | 'mm' | 'in' | 'pt' | 'pc'
  }

  /** 'ltr' or 'rtl' */
  direction?: 'ltr' | 'rtl'
  components?: any
  palette?: IStateThemePalette

  /** Can be a function, an array, a number... */
  spacing?: any

  shape?: {
    /** Default is 4 */
    borderRadius?: number
  }

  mixins?: IStateThemeMixins

  /**
   * Shadow example:
   * 
   * [ "0px 2px 1px -1px rgba(0,0,0,0.2), 0px, 1px, 1px, 0px" ]
   */
  shadows?: string[]

  typography?: IStateThemeTypography

  transitions?: {
    /** Can be a function, an array, a number... */
    getAutoHeightDuration?: any
    /** Can be a function, an array, a number... */
    create?: any
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
