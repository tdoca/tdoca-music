const path = require('path');

function resolve(dir){
    return path.join(__dirname,dir)
}

module.exports={
  devServer: {
    proxy: 'http://localhost:8888'
  },
  chainWebpack:(config)=>{
    config.resolve.alias.set('@',resolve('./src'))
  },
  outputDir: 'server/res/static/'
}