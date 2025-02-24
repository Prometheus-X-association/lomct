const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  /** shared theme configuration */
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        neutral01: '#F5F5F5',
        neutral02: '#E6E6E6',
        neutral03: '#D9D9D9',
        neutral04: '#CCCCCC',
        neutral06: '#999999',
        neutral08: '#666',
        neutral13: '#0D0D0D',

        mainBlue01: '#E9F3FF',
        mainBlue02: '#D2E8FF',
        mainBlue03: '#BCDCFF',
        mainBlue05: '#79B9FF',
        mainBlue07: '#1F8AFF',
        mainBlue08: '#196ECC',
        mainBlue09: '#135399',

        cyan04: '#9AEDED',
        cyan07: '#04D1D1',
        cyan08: '#03A7A7',
        cyan09: '#027D7D',

        signalRed02: '#FDDCDC',
        signalRed04: '#FBB8B8',

        yellow03: '#FFF8C1',
      },
    },
  },
  /** shared plugins configuration */
  plugins: [],
};
