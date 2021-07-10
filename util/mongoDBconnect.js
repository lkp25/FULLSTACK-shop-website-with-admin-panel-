const mongoDB = require('mongodb')
const mongoClient = mongoDB.mongoClient

let _db

const mongoConnect = (cb) => {    
    mongoDB.MongoClient.connect
    ('mongodb+srv://123:NabugsJzLbHcZJqI@cluster0.cc96k.mongodb.net/data?retryWrites=true&w=majority?authSource=admin')
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