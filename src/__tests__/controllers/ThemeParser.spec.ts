import ThemeParser from '../../controllers/ThemeParser'

const mockTheme: any = {
  alpha: function() {
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
  },

  breakpoints: {
    up: function(size: string) {
      switch (size) {
      case 'sm':
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
}

test('ThemeParser.parse()', done => {
  const tp = new ThemeParser(mockTheme, {
    'position': 'relative',
    'borderRadius': 'shape.borderRadius',
    'padding': 'spacing, 2, 2',
  })
  expect(tp.parse().borderRadius).toBe(200)
  expect(tp.parse().padding).toBe(200)

  tp.set({
    'padding': 'spacing , true'
  })
  expect(tp.parse().padding).toBe(200)

  tp.set({
    'padding': 'spacing'
  })
  expect(tp.parse().padding).toBe(undefined)

  tp.set({
    '&:hover' : {
      'backgroundColor' : 'alpha, palette.common.white, 0.25'
    }
  })
  expect(tp.parse()['&:hover'].backgroundColor).toBe(200)

  tp.set({
    'breakpoints.up, sm': {
      marginLeft: 'spacing, 3',
      width: 'auto'
    }
  })

  expect(tp.parse()[200]).toEqual({
    marginLeft: 200,
    width: 'auto'
  })

  done()
})
