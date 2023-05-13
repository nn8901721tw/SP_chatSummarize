const mongoose = require('mongoose');

const ProcessSchema = new mongoose.Schema({
    result: String,
    from: {
        type: Object,
        required: true
    },
    to: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Process = mongoose.model('Process', ProcessSchema);

module.exports = Process;
