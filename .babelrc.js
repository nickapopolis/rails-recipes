return {
  "presets": [
    [
      "env",
      {
        "modules": false,
        "targets": {
          "browsers": "> 1%",
          "uglify": true
        },
        "useBuiltIns": true
      }
    ],
    "react"
  ],
  "plugins": [
    "syntax-dynamic-import",
    "transform-object-rest-spread",
    [
      "transform-class-properties",
      {
        "spec": true
      }
    ],
    [require("babel-plugin-module-resolver").default, {
      "root": ["./app"],
      "alias": {
        "assets": "./assets"
      }
    }]
  ]
}
