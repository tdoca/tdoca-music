// let http = require('http')
// let url = require('url')
// let router = require('./router.js')

// http.createServer((req, res) => {
//     console.log(url.parse(req.url).pathname)
//     router[`${url.parse(req.url).pathname}`](req,res)
// }).listen(8888)


let express = require('express')
let MongoClient = require('mongodb').MongoClient
let path = require('path')
let fs = require('fs')
const mongodbUrl = 'mongodb://localhost'
const { search, song_url, song_detail } = require('./NeteaseCloudMusicApi')

let app = express()

// app.get('/',(req, res)=>{
//     let pathname = url.parse(req.url,true).pathname
//     console.log(pathname)
//     fs.readFile('res/static/index.html',(err,data)=>{
//         if(err){
//             console.log(err)
//             res.end()
//             return
//         }
//         res.writeHead(200,{'Content-Type': 'html/document;charset=UTF-8'})
//         res.end(data)
//         return
//     })
// })
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'res/static/')))

app.post('/api/login', jsonParser, (req, res)=>{
    MongoClient.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, mongodb) {
        if (err) throw err;
        let db_user = mongodb.db('tdoca_music')
        let requestData = req.body
        console.log(requestData)
        let userQuery = {'username':requestData.username,'password':requestData.password}
        db_user.collection('user').find(userQuery).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
            if(result.length == 0) {
                res.end('no_user')
            }else {
                res.end('logined')
            }
            console.log(result);
            mongodb.close();
        });
    });
})

app.get('/api/search', async (req, res)=>{
    let keywords = req.query.keywords
    console.log(keywords)
    try {
        const result = await search({
            keywords
        })
        res.end(JSON.stringify(result))
    }catch(err) {
        console.log(err)
    }
})

app.get('/api/getMusicUrlById', async (req, res)=>{
    let id = req.query.id
    console.log(id)
    try {
        const result = await song_url({
            id
        })
        res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'})
        res.end(JSON.stringify(result))
    }catch(err) {
        console.log(err)
    }
    // fs.readFile('res/audio/'+query.musicName,(err, data)=>{
    //     if(err) {
    //         console.log(err)
    //         res.end()
    //         return
    //     }
    //     res.writeHead(200,{'Accept-Ranges': 'bytes','Content-Type': 'audio/media;charset=UTF-8'})
    //     res.end(data)
    //     return
    // })
})

app.get('/api/getMusicDetailById', async (req, res)=>{
    let ids = req.query.ids
    console.log(ids)
    try {
        const result = await song_detail({
            ids
        })
        res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'})
        res.end(JSON.stringify(result))
        // res.end()
    }catch(err){
        console.log(err)
    }
})

app.get('/api/getAvatarByUser',(req, res)=>{
    // let query = url.parse(req.url,true).query
    fs.readFile('res/avatar/avatar.jpg',(err, data)=>{
        if(err) {
            console.log(err)
            res.end()
            return
        }
        res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'})
        res.end(data)
        return
    })
})

app.listen(8888)

console.log('server running')