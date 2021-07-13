const mongoDB = require('mongodb')
const mongoClient = mongoDB.mongoClient
require('dotenv').config()
let _db

const mongoConnect = (cb) => {    
    mongoDB.MongoClient.connect
    (process.env.MONGODB_URI)
    .then((client)=>{
        _db = client.db()
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

