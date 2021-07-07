const mongoDB = require('mongodb')
const mongoClient = mongoDB.mongoClient

let _db

const mongoConnect = (cb) => {    
    mongoDB.MongoClient.connect
    ('mongodb+srv://123:LoCtydGIYAKQFNE6@cluster0.cc96k.mongodb.net/dsdf?retryWrites=true&w=majority')
    .then((client)=>{
        _db = client.db('dsdf')
        cb(client)
        console.log('connected');
    })
    .catch(err => {
        console.log(err)
        throw err
    })
}

const getDB = ()=>{
    if(_db){
        return _db
    }
    throw 'no database found'
}

exports.mongoConnect = mongoConnect
exports.getDB = getDB