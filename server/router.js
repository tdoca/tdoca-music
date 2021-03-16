let fs = require('fs')
let url = require('url')

module.exports = {
    '/getMusic': (request, response) => {
        let query = url.parse(request.url).query.replace('%20', ' ')
        musicName = query.split('=')[1]
        console.log(musicName)
        fs.readFile('res/audio/'+musicName, function(err, data) {
            if(err) {
                console.log(err)
                response.writeHeader({
                    'Content-Type': 'text/html; charset=UTF-8'
                })
                response.end()
                return
            }
            // response.writeHeader({
            //     'Accept-Ranges': 'bytes',
            //     'Content-Type': 'audio'
            // })
            response.end(data)
            return
        })
    },
}