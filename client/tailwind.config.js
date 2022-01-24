module.exports = {
  mode : 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        my_color: '#4dcb7a',
    },
      margin:{
        100 : "100px",
        200 : "200px",
        300 : "300px",
      },
      padding:{
        50 : "50px",
        100 : "100px",
        200 : "200px",
        250 : "250px",
        300 : "300px",
      },
      width:{
        100 : "100px",
        150 : "150px",
        200 : "200px",
        250 : "250px",
        300 : "300px",
        350 : "350px",
      },
      height:{
        100 : "100px",
        150 : "150px",
        200 : "200px",
        250 : "250px",
        300 : "300px"
      }
    },
    colors:{
      primary : "#EBEBEB",
      secondary : "#FAFAFA"
    }
  },
  plugins: [],
}
