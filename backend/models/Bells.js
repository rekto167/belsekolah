const mongoose = require('mongoose');

const BellSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    }
});

module.exports = Bells = mongoose.model('bells', BellSchema);