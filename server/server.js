const express = require('express')
const MongoClient = require('mongodb').MongoClient
const path = require('path')
const request = require('request')
const uuidv4 = require('uuid/v4')
const mongodbUrl = 'mongodb://localhost'
const { search, song_url, song_detail, lyric } = require('./NeteaseCloudMusicApi')

let app = express()
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({extended:false}))
// app.use(express.static(path.join(__dirname,'res/static/')))

app.post('/api/signIn', jsonParser, (req, res)=>{
    MongoClient.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, mongodb) {
        if (err) throw err;
        let db_user = mongodb.db('tdoca_music')
        let requestData = req.body
        console.log(requestData)
        let userForm = {'username':requestData.username,'password':requestData.password}
        db_user.collection('user').find(userForm).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
            if(result.length != 0) {
                res.end(JSON.stringify({
                    status: 'true',
                    uid: result[0].uid
                }))
            }else {
                res.end(JSON.stringify({
                    status: 'false'
                }))
            }
            mongodb.close();
        });
    });
})

app.post('/api/signUp', jsonParser, (req, res)=>{
    MongoClient.connect(mongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, mongodb) {
        if(err) throw err
        let db_user = mongodb.db('tdoca_music')
        let requestData = req.body
        let userForm = {
            username: requestData.username,
            password: requestData.password,
            uid: uuidv4()
        }
        db_user.collection('user').find(requestData.username).toArray(function(err,result){
            if(err) throw err
            if(result.length != 0) {
                res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
                res.end('false')
            }else {
                db_user.collection('user_play_history').insertOne({uid: userForm.uid,songs:[]}, function(err){
                    if(err) throw err
                    db_user.collection('user').insertOne(userForm, function(err){
                        if(err) throw err
                        res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
                        res.end('true')
                        mongodb.close()
                    })
                })
            }
        })
    })
})

app.get('/api/search', async (req, res)=>{
    let keywords = req.query.keywords
    let offset = req.query.offset
    console.log(keywords,offset)
    try {
        const result = await search({
            keywords,
            limit: 30,
            offset
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
})

// app.get('/api/downloadSource', (req, res)=>{
//     request(req.query.url, function(err,result){
//         if(err) throw err
//         result = result.body
//         res.writeHead(200,{"Content-Type":"application/octet-stream",//告诉浏览器这是一个二进制文件
//         "Content-Disposition":`attachment;`})
//         res.end(Buffer.from(result))
//     })
// })

app.get('/api/getMusicDetailById', async (req, res)=>{
    let ids = req.query.ids
    console.log(ids)
    try {
        const result = await song_detail({
            ids
        })
        res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'})
        res.end(JSON.stringify(result))
    }catch(err){
        console.log(err)
    }
})

app.get('/api/getLyricById', async (req, res)=> {
    let id = req.query.id
    try {
        const result = await lyric({
            id
        })
        res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'})
        res.end(JSON.stringify(result))
    }catch(err) {
        console.log(err)
    }
})

app.post('/api/getSongSheetByUid', jsonParser, (req,res)=>{
    MongoClient.connect(mongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, mongodb) {
        if(err) throw err
        let db_user = mongodb.db('tdoca_music')
        let requestData = req.body
        db_user.collection('user_song_sheet').find({uid: requestData.uid}).toArray(function(err,result) {
            if(err) throw err
            let stlist = new Array
            for(let i=0; i<result.length; i++) {
                let stObj = {
                    sid: result[i].sid,
                    title: result[i].title,
                    songs: result[i].songs
                }
                stlist.push(stObj)
            }
            res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'})
            res.end(JSON.stringify(stlist))
            mongodb.close()
        })
    })
})

app.post('/api/createSongSheet', jsonParser, (req,res)=>{
    MongoClient.connect(mongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, mongodb) {
        if(err) throw err;
        let db_user = mongodb.db('tdoca_music')
        let requestData = req.body
        let songSheet={
            uid: requestData.uid,
            sid: uuidv4(),
            title: requestData.title,
            songs: []
        }
        db_user.collection('user_song_sheet').insertOne(songSheet, function(err, result) {
            if (err) throw err;
            res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
            res.end('OK')
            console.log(result);
            mongodb.close();
        })
    });
})

app.post('/api/addMusicToSongSheet', jsonParser, (req,res)=>{
    MongoClient.connect(mongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, mongodb) {
        if(err) throw err
        let db_user = mongodb.db('tdoca_music')
        let requestData = req.body
        db_user.collection('user_song_sheet').find({sid: requestData.sid}).toArray(function(err, result){
            if(err) throw err
            let songs = result[0].songs
            songs.unshift(requestData.mid.toString())
            db_user.collection('user_song_sheet').updateOne({sid: requestData.sid},{$set: {songs}},function(err, result){
                if(err) throw err
                res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
                res.end(JSON.stringify(result))
                mongodb.close()
            })
        })
    })
})

app.post('/api/getPlayHistoryByUid', jsonParser, (req,res)=>{
    MongoClient.connect(mongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, mongodb) {
        if(err) throw err
        let db_user = mongodb.db('tdoca_music')
        let requestData = req.body
        db_user.collection('user_play_history').find({uid: requestData.uid}).toArray(function(err,result) {
            if(err) throw err
            res.writeHead(200, {'Content-Type':'application/json;charset=utf-8'})
            res.end(JSON.stringify(result[0].songs))
            mongodb.close()
        })
    })
})

app.post('/api/addMusicToPlayHistory', jsonParser, (req,res)=>{
    MongoClient.connect(mongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, mongodb) {
        if(err) throw err
        let db_user = mongodb.db('tdoca_music')
        let requestData = req.body
        db_user.collection('user_play_history').find({uid: requestData.uid}).toArray(function(err, result){
            if(err) throw err
            let songs = result[0].songs
            if(songs.length >= 50) {
                songs.unshift(requestData.mid)
                songs.splice(songs.length-1, 1)
            }else {
                songs.unshift(requestData.mid)
            }
            db_user.collection('user_play_history').updateOne({uid: requestData.uid},{$set: {songs}},function(err,result){
                if(err) throw err
                res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
                res.end()
                mongodb.close()
            })
        })
    })
})

app.post('/api/removeMusicOfPlayHistory', jsonParser, (req,res)=>{
    MongoClient.connect(mongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, mongodb) {
        if(err) throw err
        let db_user = mongodb.db('tdoca_music')
        let requestData = req.body
        db_user.collection('user_play_history').find({uid: requestData.uid}).toArray(function(err, result){
            if(err) throw err
            let songs = result[0].songs
            songs.splice(requestData.index, 1)
            db_user.collection('user_play_history').updateOne({uid: requestData.uid},{$set: {songs}},function(err,result){
                if(err) throw err
                res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'})
                res.end()
                mongodb.close()
            })
        })
    })
})

// app.use(express.static('static'))

app.listen(8080)

console.log('server running')