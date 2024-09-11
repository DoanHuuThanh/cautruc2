/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{html,hbs}', './public/**/*.{css,js}'],
  theme: {
    colors: {
      gray: '#f5f5f5',
      transparent: 'transparent',
      'main-blue': '#004aad',
      'main-yellow': '#ffbd59',
      black: '#232323',
      "black-light": '#444444',
      "b-separate": "#d0d0d0"
    },
    fontFamily: {
      base: ["Montserrat"], // font chính
      lato: ["Lato"] // font cho những thông tin thêm
    },
    fontWeight: {
      light: "300",
      regular: "400",
      medium: "500",
      bold: "700"
    },
    fontSize: {
      '4': ['16px', '24px'],
      '3': ['12px', '16px'],
      '3.5': ['14px', '20px'],
      '4.5': ['18px', '28px'],
      '5': ['20px', '28px']
    },
    extend: {},
  },
  plugins: [],
};
