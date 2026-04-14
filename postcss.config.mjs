const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-env": {
      stage: 1,
      autoprefixer: {
        grid: true,
      },
      features: {
        "color-function": true,
        "custom-properties": true,
      },
    },
  },
};

export default config;