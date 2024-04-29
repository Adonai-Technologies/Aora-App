/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary:{
          default: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black:{
          default: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray:{
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        pthin:["poppins-thin", "sans-serif"],
        pextralight:["poppins-extralight", "sans-serif"],
        plight:["poppins-light", "sans-serif"],
        pregular:["poppins-regular", "sans-serif"],
        pmedium:["poppins-medium", "sans-serif"],
        psemibold:["poppins-semibold", "sans-serif"],
        pbold:["poppins-bold", "sans-serif"],
        pextrabold:["poppins-extrabold", "sans-serif"],
        pblack:["poppins-black", "sans-serif"],
        
      }
    },
  },
  plugins: [],
}

