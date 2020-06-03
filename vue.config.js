module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_variables.scss";`
      }
    }
  },
  devServer: {
    proxy: 'http://localhost:3001/',
}
}