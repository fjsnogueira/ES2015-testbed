System.config({
  baseURL: "/app",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime"
    ]
  },
  paths: {
    "*": "dist/*.js",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  bundles: {
    "bundled": [
      "index-viewmodel",
      "github:knockout/knockout@3.3.0",
      "github:knockout/knockout@3.3.0/dist/knockout.debug",
      "index-template.html!github:systemjs/plugin-text@0.0.2"
    ],
    "dist/bundled": [
      "github:knockout/knockout@3.3.0/dist/knockout.debug",
      "index-template.html!github:systemjs/plugin-text@0.0.2",
      "github:knockout/knockout@3.3.0",
      "index-viewmodel"
    ]
  },

  map: {
    "babel": "npm:babel-core@5.8.23",
    "babel-runtime": "npm:babel-runtime@5.8.20",
    "core-js": "npm:core-js@1.1.3",
    "css": "github:systemjs/plugin-css@0.1.15",
    "jquery": "github:components/jquery@2.1.4",
    "knockout": "github:knockout/knockout@3.3.0",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:babel-runtime@5.8.20": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@1.1.3": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});
