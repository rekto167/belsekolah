const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bell: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bells'
    },
});

module.exports = Activities = mongoose.model('activities', ActivitySchema);