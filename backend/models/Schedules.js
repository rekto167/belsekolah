const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    activity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'activities'
    },
    day: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'days'
    },
    timeStart: {
        type: String,
        required: true,
    },
    timeEnd: {
        type: String,
        required: true
    }
});

module.exports = Schedules = mongoose.model('schedules', ScheduleSchema);