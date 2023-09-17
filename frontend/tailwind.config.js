/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // colors: {
    //   primary: "rgb(var(--color-primary) / <alpha-value>)",
    //   text: "rgb(var(--color-text) / <alpha-value>)",
    //   success: "rgb(var(--color-success) / <alpha-value>)",
    //   info: "rgb(var(--color-info) / <alpha-value>)",
    //   warn: "rgb(var(--color-warn) / <alpha-value>)",
    //   error: "rgb(var(--color-error) / <alpha-value>)",
    //   transparent: "transparent",
    //   current: "currentColor",
    //   back: "#fff"
    // },
    extend:{
      colors:{
        back:"rgb(var(--color-back) / <alpha-value>)",
        front:"rgb(var(--color-front) / <alpha-value>)",
        active:"rgb(var(--color-active) / <alpha-value>)",
        border:"rgb(var(--color-border) / <alpha-value>)",
        text:"rgb(var(--color-text) / <alpha-value>)",
        danger:"rgb(var(--color-danger) / <alpha-value>)",
        
      },
      animation: {
        "shake":"shake 1s linear infinite"
      },
      keyframes: {
        
        shake:{
          "0%":{transform:"rotate(0deg)"},
          "25%":{transform:"rotate(1deg)"},
          "50%":{transform:"rotate(0deg)"},
          "75%":{transform:"rotate(1deg)"},
          "100%":{transform:"rotate(0deg)"}
        }
      }
    }
  },

  daisyui: {
    themes: [
      {
        light:{
          primary:"#f99f38",
          secondary: "#38bdf8",
          accent: "#09f9f5",
          neutral: "#2d232f",
          "base-100": "#fff",
          info: "#34b9da",
          // success: "#00c851",
          // success: "#5cb85c",
          // success: "#4BB543",
          success: "#28a745",
          warning: "#a28007",
          error: "#e96377",
          color:"black",
        },
      },
      {
        dark:{
          primary:"#f99f38",
          color:"white",
          // back:"black",

        },

        
      },
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    // darkTheme: "dark", // name of one of the included themes for dark mode
    // base: true, // applies background color and foreground color for root element by default
    // styled: true, // include daisyUI colors and design decisions for all components
    // utils: true, // adds responsive and modifier utility classes
    // rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    // prefix: "d-", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  },
  // plugins:[]
  plugins: [require("daisyui")],
}

