const mongoDB = require('mongodb')
const mongoClient = mongoDB.mongoClient

const mongoConnect = (cb) => {    
    mongoDB.MongoClient.connect
    ('mongodb+srv://123:LoCtydGIYAKQFNE6@cluster0.cc96k.mongodb.net/dsdf?retryWrites=true&w=majority')
    .then((client)=>{
        cb(client)
        console.log('connected');
    })
    .catch(err => console.log(err))
}

module.exports = mongoConnect