import { createSlice } from '@reduxjs/toolkit'
import initialState from '../state/initial.state'

export const appBarSlice = createSlice({
  name: 'appBar',
  initialState: initialState.appBar,
  reducers: {
    appBarBackgroundUpdate: (state, action) => {
      state.background = action.payload
    },
    appBarLayoutUpdate: (state, action) => {
      state.layout = action.payload
    },
    appBarPropsUpdate: (state, action) => {
      state.props = action.payload
    },
    appBarToolbarPropsUpdate: (state, action) => {
      state.toolbarProps = action.payload
    },
    appBarMenuIconPropsUpdate: (state, action) => {
      state.menuIconProps = action.payload
    },
    appBarLogoPropsUpdate: (state, action) => {
      state.logoProps = action.payload
    },
    appBarTextLogoPropsUpdate: (state, action) => {
      state.textLogoProps = action.payload
    },
    appBarSearchFieldPropsUpdate: (state, action) => {
      state.searchFieldProps = action.payload
    },
    appBarDesktopMenuItemsPropsUpdate: (state, action) => {
      state.desktopMenuItemsProps = action.payload
    },
    appBarMobileMenuItemsPropsUpdate: (state, action) => {
      state.mobileMenuItemsProps = action.payload
    },
    appBarMobilMenuIconPropsUpdate: (state, action) => {
      state.mobileMenuIconProps = action.payload
    },
    appBarLogoThemeUpdate: (state, action) => {
      state.logoTheme = action.payload
    },
    appBarBackgroundInheritedUpdate: (state, action) => {
      state.backgroundInherited = action.payload
    },
    appBarUseDefaultBackgroundUpdate: (state, action) => {
      state.useDefaultBackground = action.payload
    },
    appBarUseDefaultTypographyUpdate: (state, action) => {
      state.useDefaultTypography = action.payload
    },
    appBarTypographyInheritedUpdate: (state, action) => {
      state.typographyInherited = action.payload
    },
    appBarComponentsUpdate: (state, action) => {
      state.components = action.payload
    },
  }
})

export const appBarActions = appBarSlice.actions
export const {
  appBarBackgroundUpdate,
  appBarLayoutUpdate,
  appBarPropsUpdate,
  appBarToolbarPropsUpdate,
  appBarMenuIconPropsUpdate,
  appBarLogoPropsUpdate,
  appBarTextLogoPropsUpdate,
  appBarSearchFieldPropsUpdate,
  appBarDesktopMenuItemsPropsUpdate,
  appBarMobileMenuItemsPropsUpdate,
  appBarLogoThemeUpdate,
  appBarMobilMenuIconPropsUpdate,
  appBarBackgroundInheritedUpdate,
  appBarUseDefaultBackgroundUpdate,
  appBarUseDefaultTypographyUpdate,
  appBarTypographyInheritedUpdate,
  appBarComponentsUpdate
} = appBarSlice.actions

export default appBarSlice.reducer