const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
      devServer: {
        port: 8080
      },
      transpileDependencies: true,
      configureWebpack: {
        resolve: {
          fallback: {
            "path": require.resolve("path-browserify")
          }
        }
      }

},

)
