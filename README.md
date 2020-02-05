SAT Team ...

# Install
npm install
# Develop mode: 
npm run start
# Build
npm run build
# Config
src/configs/dev.js

export default {
    params: {
        version: '1.0',
        format: 'json',
        mode: 'development'
    },
    host: "https://192.168.8.59:8443/fineract-provider/api",
}
# Change Global Style 
 /webpack.common.js
```
 const themeConfig = {
  'primary-color': '#1DA57A', // primary color for all components
  'link-color': '#1890ff', // link color
  'success-color': '#52c41a', // success state color
  'warning-color': '#faad14', // warning state color
  'error-color': '#f5222d', // error state color
  'font-size-base': '14px', // major text font size
  'heading-color': '#1DA57A', // heading text color
  'text-color': '#92973f', // major text color
  'text-color-secondary': '#1DA57A', // secondary text color
  'disabled-color': 'rgba(0, 0, 0, .25)', // disable state color
  'border-radius-base': '4px', // major border radius
  'border-color-base': '#d9d9d9', // major border color
  'box-shadow-base': '#1DA57A', // major shadow for layers
  'body-background': '#b8d9ab'// Background color for `<body>`
}
