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
        400 : "400px",
        420 : "420px",
        450 : "450px",
        500 : "500px"
      },
      height:{
        100 : "100px",
        150 : "150px",
        200 : "200px",
        250 : "250px",
        300 : "300px",
        350 : "350px",
        400 : "400px",
        450 : "450px"
      }
    },
    colors:{
      primary : "#EBEBEB",
      secondary : "#FAFAFA"
    }
  },
  plugins: [],
}
