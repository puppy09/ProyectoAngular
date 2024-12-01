/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",
       "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'azulinoSweeney': '#5D9DA8',
      'blanquitoComponentes':'#ebf3f4'
    },
    extend: {
      width:{
        '300':'150%',
        '200': '130%'      
    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    })
  ],
}
}