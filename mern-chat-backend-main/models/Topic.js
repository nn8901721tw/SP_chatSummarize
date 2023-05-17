const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    name: String,
    password: String,
})

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic
