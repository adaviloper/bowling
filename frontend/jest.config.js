module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue", "ts", "tsx"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.js$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  // transformIgnorePatterns: ["<rootDir>/node_modules/"],
  transformIgnorePatterns: ["node_modules/(?!(babel-jest|jest-vue-preprocessor)/)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: ["**/tests/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"],
  testURL: "http://localhost/",
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
  globals: {
    "ts-jest": {
      babelConfig: true
    }
  }
};