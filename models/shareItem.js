var mongoose = require('mongoose');

var ShareItemSchema = mongoose.Schema({
    title: { type: String, default: '未命名' },
    videolink: String,
    datalink: String,
    photolink: String,
    thumbnail: String,
    date: String,
    tags: [],
    type: String,
    catalog: String,
    weight: { type: Number, default: 0 }
});

ShareItemSchema.statics.getTags = function (itemType, callback) {
    
    var tags = {};
    var query = this.model('ShareItem').find({type: itemType});

    query.exec(function(err, docs) {

        //按column分类
        docs.forEach(function(doc, index) {
            if (doc.tags) {
                doc.tags.forEach(function(tag, index) {
                    if (tags[tag] == null) {
                        tags[tag] = 0;
                    }
                    tags[tag] += 1;
                });
            }
        });

        callback(err, tags);
    });
}

module.exports = mongoose.model('ShareItem', ShareItemSchema);