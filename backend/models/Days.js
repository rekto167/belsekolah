const mongoose = require('mongoose');

const DaysSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = Days = mongoose.model('days', DaysSchema);