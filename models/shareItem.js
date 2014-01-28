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


module.exports = mongoose.model('ShareItem', ShareItemSchema);