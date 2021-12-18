import ThemeParser from '../../controllers/ThemeParser'

const mockTheme: any = {
  breakpoints: {
    up: function(size: string) {
      switch (size) {
      case 'sm':
      case 'md':
        return 200
      }
    }
  },

  palette: {
    common: {
      white: '#fff'
    }
  },

  shape: {
    borderRadius: 200
  },

  /** Spacing mock */
  spacing: function() {
    switch(arguments.length) {
    default:
      return 500
    case 1:
    case 2:
    case 4:
      return 200
    }
  },

  transitions: {
    create: function() {
      if (arguments.length > 0) {
        return 200
      }
      return 500
    }
  }
}

const alpha = function() {
  switch(arguments.length) {
  default:
    return 500
  case 2:
    if (typeof arguments[0] === 'string'
      && typeof arguments[1] === 'number'
    ) {
      return 200
    }
    return 500
  }
}


test('ThemeParser.parse()', done => {
  const parse = new ThemeParser({ alpha }).getParser()

  expect(parse(mockTheme, {
    'position': 'relative',
    'borderRadius': 'shape.borderRadius',
    'backgroundColor': 'alpha, palette.common.white, 0.15',
    '&:hover': {
      'backgroundColor': 'alpha, palette.common.white, 0.25',
    },
    'marginRight': 'spacing, 2',
    'marginLeft': 0,
    'width': '100%',
    'breakpoints.up, sm': {
      'marginLeft': 'spacing, 3',
      'width': 'auto',
    }
  })).toEqual({
    'position': 'relative',
    'borderRadius': 200,
    'backgroundColor': 200,
    '&:hover': {
      'backgroundColor': 200,
    },
    'marginRight': 200,
    'marginLeft': 0,
    'width': '100%',
    200: {
      'marginLeft': 200,
      'width': 'auto',
    }
  })

  expect(parse(mockTheme, {
    'padding': 'spacing , true'
  })).toEqual({
    'padding': 200
  })

  expect(parse(mockTheme, {
    'padding': 'spacing'
  })).toEqual({
    'padding': undefined
  })
  
  expect(parse(mockTheme, {
    '&:hover' : {
      'backgroundColor' : 'alpha, palette.common.white, 0.25'
    }
  })).toEqual({
    '&:hover' : {
      'backgroundColor' : 200
    }
  })
  
  expect(parse(mockTheme, {
    'breakpoints.up, sm': {
      marginLeft: 'spacing, 3',
      width: 'auto'
    }
  })).toEqual({
    200: {
      marginLeft: 200,
      width: 'auto'
    }
  })

  expect(parse(mockTheme, {
    'padding': 'spacing, 0, 2',
    'height': '100%',
    'position': 'absolute',
    'pointerEvents': 'none',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center'
  })).toEqual({
    padding: 200,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })

  expect(parse(mockTheme, {
    color: 'inherit',
    '& .MuiInputBase-input': {
      'padding': 'spacing, 1, 1, 1, 0',
      // vertical padding + font size from searchIcon
      'paddingLeft': 'calc(1em + ${spacing, 4})',
      'transition': 'transitions.create, width',
      'width': '100%',
      'breakpoints.up, md': {
        'width': '20ch',
      },
    },
  })).toEqual({
    color: 'inherit',
    '& .MuiInputBase-input': {
      'padding': 200,
      'paddingLeft': 'calc(1em + 200)',
      'transition': 200,
      'width': '100%',
      200: {
        'width': '20ch',
      }
    }
  })

  done()
})
