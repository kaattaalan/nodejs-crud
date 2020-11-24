const Datastore = require('nedb'),
    db = new Datastore({ filename: './repo/userdatafile', autoload: true }),
    bcrypt = require('bcrypt');

db.ensureIndex({ fieldName: 'email', unique: true })

module.exports = {
    create: function(body, callBack) {
        body.password = bcrypt.hashSync(body.password, 10);
        db.insert(body, (err, newDoc) => callBack(err, newDoc))
    },
    findOne: function(val, callBack) {
        db.findOne(val, (err, doc) => callBack(err, doc))
    }
}