const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
      devServer: {
        port: 9098
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
