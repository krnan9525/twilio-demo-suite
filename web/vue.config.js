const manifestJSON = require('./public/manifest.json');
module.exports = {
  pwa: {
    themeColor: manifestJSON.theme_color,
    name: manifestJSON.short_name,
    msTileColor: manifestJSON.background_color,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'service-worker.js'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/common/_globals.scss";`
      }
    }
  }
  // Use this to split chunk
  // configureWebpack: {
  //   optimization: {
  //     splitChunks: {
  //       minSize: 10000,
  //       maxSize: 200000
  //     }
  //   }
  // }
};
