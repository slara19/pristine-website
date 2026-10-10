/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Achromatic palette: hierarchy comes from weight, size and tone, never hue
      colors: {
        ink: '#141414',
        graphite: '#707070',
        ash: '#adadad',
        fog: '#ededed',
        mist: '#f2f2f2',
        silver: '#c2c2c2',
      },
      // Inter variable exposes in-between weights (book 440/456, heavy 652)
      fontWeight: {
        w440: '440',
        w456: '456',
        w652: '652',
      },
      letterSpacing: {
        display: '-0.025em',
        heading: '-0.02em',
        body: '0.005em',
      },
      boxShadow: {
        float: 'rgba(0, 0, 0, 0.04) 0px 8px 40px 0px',
      },
    },
  },
  plugins: [],
}
