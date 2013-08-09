var mongoose = require('mongoose');

var NodeSchema = mongoose.Schema({
    nodeName: String,
    title: String,
    content: String
});

module.exports = mongoose.model('Node', NodeSchema);