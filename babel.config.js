module.exports = {
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread",
    [
      "babel-plugin-transform-class-properties",
      {
        "spec": true
      }
    ],
    ["babel-plugin-module-resolver", {
      "root": ["./app"],
      "alias": {
        "assets": "./assets"
      }
    }]
  ]
}
