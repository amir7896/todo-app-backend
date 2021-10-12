const mongoose = require('mongoose');

const Task = mongoose.model ('Task' , {
    title: {type: String},
    isDone:{type:Boolean}
})

module.exports = Task;