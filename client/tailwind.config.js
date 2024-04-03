import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */

export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // fontFamily: {
    //   Helvetica: ['Helvetica']
    // },

    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      transparent: 'transparent',
      'theme-primary-01': '#FFF',
      'theme-primary-02': '#000',
      'theme-primary-03': '#086cff',
      'theme-primary-04': '#FF6D3D',

      'theme-main-0': '#FFF',
      'theme-main-50': '#edf7ff',
      'theme-main-100': '#d6ecff',
      'theme-main-200': '#b6e0ff',
      'theme-main-300': '#83ceff',
      'theme-main-400': '#49b2ff',
      'theme-main-500': '#208dff',
      'theme-main-600': '#086cff',
      'theme-main-700': '#0254f3',
      'theme-main-800': '#0944c4',
      'theme-main-900': '#0c3482',
      'theme-main-950': '#0e265d'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    fontSize: {
      'd-1': '4.515rem', // 72.24px
      'd-2': '3.763rem', // 60.20px
      'd-3': '3.135rem', // 50.16px
      'd-4': '2.613rem', // 41.8px
      'h-1': '2.178rem', // 34.84px
      'h-2': '1.814rem', // 29.03px
      'h-3': '1.512rem', // 24.19px
      'h-4': '1.26rem', // 20.16px
      'h-5': '1.05rem', // 16.8px
      'p-1': '0.875rem', // 14px
      'p-2': '0.729rem', // 11.67px
      'p-3': '0.608rem' // 9.72px
    },
    // aspectRatio: {
    //   '4/3': '4 / 3',
    //   '3/2': '3 / 2',
    //   '2/3': '2 / 3',
    //   '9/16': '9 / 16'
    // },
    // lineClamp: {
    //   7: '7',
    //   11: '11'
    // },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
});