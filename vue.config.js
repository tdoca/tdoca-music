const path = require('path');

function resolve(dir){
  return path.join(__dirname,dir)
}

module.exports={
  devServer: {
    proxy: 'http://localhost:8080'
  },
  chainWebpack:(config)=>{
    config.resolve.alias.set('@',resolve('./src'))
  },
  outputDir: 'server/static/'
}